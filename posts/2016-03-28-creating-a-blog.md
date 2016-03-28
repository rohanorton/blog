---
title: Creating my Hakyll blog
---

So, I just (re-)started learning Haskell, and although reading about lambda
calculus, functors, and monads is fascinating, I decided that it would probably
be a lot of help if I got my hands dirty writing some actual Haskell code. I
figured writing a blog using [Hakyll](https://jaspervdj.be/hakyll/) would be a
pretty decent place to start. And what better way to baptise such a blog than to
write of the trials and tribulations of getting it up and running!

The first requirement is to install Hakyll. The installation instructions on the
Hakyll website are written to use [Cabal](https://www.haskell.org/cabal/), which
has for many years been the default package building system in Haskell. However,
most of the accounts I've heard about working with Cabal is that it's something
of a nightmare. Instead I opted to try out the new kid on the block,
[Stack](http://docs.haskellstack.org/).

Firstly I created my new Stack project:

```bash
$ stack new blog
```

This produced a nice shiny new directory. Well, this feels good so far. Next I
try and install Hakyll itself:

```bash
$ stack install hakyll
```

Which installs all my dependencies and shoves `hackyll-init` into
`~/.local/bin`. I figure that I'm supposed to add `~/.local/bin` to my path, so
edit my .zshrc accordingly:

```bash
export PATH=$HOME/.local/bin:$PATH
```

And then, back inside my blog directory, run:

```bash
$ hakyll-init .
```

Which adds a whole bunch more files and, looking at my git diff, seems to have
overwritten the `blog.cabal` that stack had originally generated for me. Oh. Is
this bad? I have no idea. Umming and ahhing I figure I can copy some of the old
contents back in and it will be fine. We'll see.

I go back to the Hakyll install instructions, and try to build:

``` bash
$ ghc --make -threaded site.hs

site.hs:4:18:
    Could not find module ‘Hakyll’
    Use -v to see a list of the files searched for.
```

Bugger.

What's this about? After a little bit of digging I realise it's because I'm
using Stack. So, I follow the instructions on the Stack website about how to
build:

```bash
$ stack build
blog-0.1.0.0: configure
Configuring blog-0.1.0.0...
blog-0.1.0.0: build
Preprocessing executable 'site' for blog-0.1.0.0...
[1 of 1] Compiling Main             ( site.hs,
.stack-work/dist/x86_64-osx/Cabal-1.22.5.0/build/site/site-tmp/Main.o )
Linking .stack-work/dist/x86_64-osx/Cabal-1.22.5.0/build/site/site ...
blog-0.1.0.0: copy/register
Installing executable(s) in
/Users/rohan/Projects/blog/.stack-work/install/x86_64-osx/lts-5.10/7.10.3/bin
```

Which looks pretty successful, except... I don't want my compiled code to be
buried in that directory, do I? I was expecting it to produce a binary in the
current directory, as compiling with standard GHC would do. Hmmm. What are my
options? Do I move the binary where I want it? Doesn't feel right doing that. I
go back to the docs and [find my answer almost
instantly](http://docs.haskellstack.org/en/stable/GUIDE/#stack-exec), so I run
the following:

```bash
$ stack exec site watch
```

And hey presto, I'm running the server.
