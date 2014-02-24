/*global describe, it, beforeEach, after */

var assert = require('chai').assert;
var fs = require('fs-extra');
var path = require('path');
var resolve = path.resolve;
var exec = require('child_process').exec;

var fixtureDir = resolve(__dirname, 'fixtures');
var tmpDir = resolve(__dirname, '../tmp');
var remove = resolve(__dirname, '../bin/component-remove');

describe('component uninstall', function() {
  beforeEach(function(done) {
    fs.copy(fixtureDir, tmpDir, done);
  });

  after(function(done) {
    fs.remove(tmpDir, done);
  });

  it('should do nothing', function(done) {
    removeExec('nothing.js', function(err) {
      if (err) return done(err);

      readComponent(function(err, component) {
        if (err) return done(err);

        assert.include(component.scripts, 'index.js');
        assert.include(component.scripts, 'foo.js');
        assert.isTrue(fileExists('index.js'));
        assert.isTrue(fileExists('foo.js'));

        done();
      });
    });
  });

  it('should remove a script', function(done) {
    removeExec('index.js', function(err) {
      if (err) return done(err);

      readComponent(function(err, component) {
        if (err) return done(err);

        assert.notInclude(component.scripts, 'index.js');
        assert.include(component.scripts, 'foo.js');
        assert.isFalse(fileExists('index.js'));
        assert.isTrue(fileExists('foo.js'));

        done();
      });
    });
  });

  it('should remove a style', function(done) {
    removeExec('index.css', function(err) {
      if (err) return done(err);

      readComponent(function(err, component) {
        if (err) return done(err);

        assert.notInclude(component.styles, 'index.css');
        assert.include(component.styles, 'bar.styl');
        assert.isFalse(fileExists('index.css'));
        assert.isTrue(fileExists('bar.styl'));

        done();
      });
    });
  });

  it('should remove a template', function(done) {
    assert.isTrue(fileExists('templates/tpl.html'));

    removeExec('templates/tpl.html', function(err) {
      if (err) return done(err);

      readComponent(function(err, component) {
        if (err) return done(err);

        assert.notInclude(component.templates, 'templates/tpl.html');
        assert.isFalse(fileExists('templates/tpl.html'));

        done();
      });
    });
  });

  it('should remove multiple files', function(done) {
    removeExec('index.js foo.js bar.styl templates/tpl.html', function(err) {
      if (err) return done(err);

      readComponent(function(err, component) {
        if (err) return done(err);

        assert.notInclude(component.scripts, 'index.js');
        assert.notInclude(component.scripts, 'foo.js');
        assert.notInclude(component.styles, 'index.styl');
        assert.notInclude(component.templates, 'templates/tpl.html');
        assert.isFalse(fileExists('index.js'));
        assert.isFalse(fileExists('foo.js'));
        assert.isFalse(fileExists('index.styl'));
        assert.isFalse(fileExists('templates/tpl.html'));

        done();
      });
    });
  });
});


function removeExec(file, cb) {
  exec('cd ' + tmpDir + ' && ' + remove + ' ' + file, cb);
}

function readComponent(cb) {
  fs.readJson(resolve(tmpDir, 'component.json'), cb);
}

function fileExists(dep) {
  return fs.existsSync(resolve(tmpDir, dep));
}
