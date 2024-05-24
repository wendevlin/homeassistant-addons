/*
This file includes code originally written by ParkSB under the MIT License.
Modifications have been made by Wendelin Peleska (masterwendu).

Original License:
Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

import type { StateBlock } from 'markdown-it'
import { MarkdownIt } from './markdownParser';

export const frontMatterPlugin = (md: MarkdownIt) => {
  var min_markers = 3,
      marker_str  = '-',
      marker_char = marker_str.charCodeAt(0),
      marker_len  = marker_str.length;

  const frontMatter = (state: StateBlock, startLine: number, endLine: number, silent: boolean) => {
    md.frontMatter = {} // reset frontmatter
    
    // Check out the first character of the first line quickly,
    // this should filter out non-front matter
    if (startLine !== 0 || marker_char !== state.src.charCodeAt(0)) {
      return false;
    }

    // Check out the rest of the marker string
    // while pos <= 3
    let start = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]
    let start_content
    let pos
    for (pos = start + 1; pos <= max; pos++) {
      if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
        start_content = pos + 1;
        break;
      }
    }

    let marker_count = Math.floor((pos - start) / marker_len);

    if (marker_count < min_markers) {
      return false;
    }
    pos -= (pos - start) % marker_len;

    // Since start is found, we can report success here in validation mode
    if (silent) {
      return true;
    }

    // Search for the end of the block
    let nextLine = startLine;

    let auto_closed = false

    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }

      if (state.src.slice(start, max) === '...') {
        break;
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;
      }

      if (marker_char !== state.src.charCodeAt(start)) {
        continue;
      }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue;
      }

      for (pos = start + 1; pos <= max; pos++) {
        if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
          break;
        }
      }

      // closing code fence must be at least as long as the opening one
      if (Math.floor((pos - start) / marker_len) < marker_count) {
        continue;
      }

      // make sure tail has spaces only
      pos -= (pos - start) % marker_len;
      pos = state.skipSpaces(pos);

      if (pos < max) {
        continue;
      }

      // found!
      auto_closed = true;
      break;
    }

    const old_parent = state.parentType;
    const old_line_max = state.lineMax;
    state.parentType = 'root';

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine;

    const token        = state.push('front_matter', '', 0);
    token.hidden = true;
    token.markup = state.src.slice(startLine, pos);
    token.block  = true;
    token.map    = [ startLine, nextLine + (auto_closed ? 1 : 0) ];
    token.meta   = state.src.slice(start_content, start - 1);

    state.parentType = old_parent;
    state.lineMax = old_line_max;
    state.line = nextLine + (auto_closed ? 1 : 0);

    // cb(token.meta);
    try {
      const frontMatterObject: Record<string, string> = {}
      token.meta.split('\n').forEach((line: string) => {
        const [key, value] = line.split(':')
        frontMatterObject[key.trim()] = value.trim()
      })
      md.frontMatter = frontMatterObject
    } catch (e) {
      console.error(`Error in frontMatterPlugin, frontmatter extraction failed and will be skipped for ${state.env.filePath ?? '?'}. Please check if your frontmatter syntax is correct.`)
      // console.error(e) // TODO add debug mode
    }

    return true
  }

  md.block.ruler.before(
    'table',
    'front_matter',
    frontMatter,
    {
      alt: [
        'paragraph',
        'reference',
        'blockquote',
        'list' 
      ]
    }
  );
};