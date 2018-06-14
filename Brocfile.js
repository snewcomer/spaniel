/*
Copyright 2017 LinkedIn Corp. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.  You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*/

const Funnel = require('broccoli-funnel');
const uglify = require('broccoli-uglify-sourcemap');
const typescript = require('broccoli-typescript-compiler').default;
const Rollup = require('broccoli-rollup');
const Merge = require('broccoli-merge-trees');

const es6Tree = typescript('src');

const umdTree = new Rollup(es6Tree, {
  annotation: 'umd',
  rollup: {
    input: 'index.js',
    external: ['spaniel'],
    output: [{
      file: 'spaniel.js',
      exports: 'named',
      format: 'umd',
      name: 'spaniel',
      sourcemap: true
    }]
  }
});

const minTree = uglify(new Funnel(umdTree, {
  destDir: 'min'
}), {
  mangle: true,
  compress: true
});

module.exports = new Merge([es6Tree, umdTree, minTree]);
