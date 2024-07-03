import { test } from 'tap';
import postcss from 'postcss';

import DoIUse from '../lib/DoIUse.js';

test('Progressive enhancement using repeated CSS properties', (t) => {
  const css = `
    p {
      background-color: black;
      background-color: rgba(0, 0, 0, 0.5);
    }
  `;

  const result = postcss(new DoIUse({
    browsers: ['ie >= 6'],
  })).process(css);
  const warnings = result.warnings();

  t.equal(warnings.length, 0, 'No warnings');

  t.end();
});

test('Progressive enhancement using @supports', (t) => {
  const css = `
    p {
      display: block;
    }

    @supports (display: grid) {
      p {
        display: grid;
        flex-wrap: wrap;
      }
    }
  `;

  const result = postcss(new DoIUse({
    browsers: ['safari >= 9'],
  })).process(css);
  const warnings = result.warnings();

  t.equal(warnings.length, 0, 'No warnings');

  t.end();
});

test('Progressive enhancement using @supports with multiple conditions', (t) => {
  const css = `
    p {
      display: block;
    }

    @supports (display: flex) and (color: hsl(0, 0%, 0%)) {
      p {
        display: flex;
        background-color: hsl(0, 0%, 0%);
      }
    }
  `;

  const result = postcss(new DoIUse({
    browsers: ['safari >= 9'],
  })).process(css);
  const warnings = result.warnings();

  t.equal(warnings.length, 0, 'No warnings');

  t.end();
});
