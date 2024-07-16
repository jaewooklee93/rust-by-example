## 파일 시스템 작업

`std::fs` 모듈에는 파일 시스템과 관련된 여러 함수가 포함되어 있습니다.

```rust,ignore
use std::fs;
use std::fs::{File, OpenOptions};
use std::io;
use std::io::prelude::*;
#[cfg(target_family = "unix")]
use std::os::unix;
#[cfg(target_family = "windows")]
use std::os::windows;
use std::path::Path;

// `% cat path`의 간단한 구현
fn cat(path: &Path) -> io::Result<String> {
    let mut f = File::open(path)?;
    let mut s = String::new();
    match f.read_to_string(&mut s) {
        Ok(_) => Ok(s),
        Err(e) => Err(e),
    }
}

// `% echo s > path`의 간단한 구현
fn echo(s: &str, path: &Path) -> io::Result<()> {
    let mut f = File::create(path)?;

    f.write_all(s.as_bytes())
}

// `% touch path`의 간단한 구현 (기존 파일 무시)
fn touch(path: &Path) -> io::Result<()> {
    match OpenOptions::new().create(true).write(true).open(path) {
        Ok(_) => Ok(()),
        Err(e) => Err(e),
    }
}

fn main() {
    println!("`mkdir a`");
    // 디렉토리 생성, `io::Result<()>` 반환
    match fs::create_dir("a") {
        Err(why) => println!("! {:?}", why.kind()),
        Ok(_) => {},
    }

    println!("`echo hello > a/b.txt`");
    // 이전 match는 `unwrap_or_else` 메서드를 사용하여 간소화할 수 있습니다.
    echo("hello", &Path::new("a/b.txt")).unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });

    println!("`mkdir -p a/c/d`");
    // 재귀적으로 디렉토리 생성, `io::Result<()>` 반환
    fs::create_dir_all("a/c/d").unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });

    println!("`touch a/c/e.txt`");
    touch(&Path::new("a/c/e.txt")).unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });

    println!("`ln -s ../b.txt a/c/b.txt`");
    // 심볼릭 링크 생성, `io::Result<()>` 반환
    #[cfg(target_family = "unix")] {
        unix::fs::symlink("../b.txt", "a/c/b.txt").unwrap_or_else(|why| {
            println!("! {:?}", why.kind());
        });
    }
    #[cfg(target_family = "windows")] {
        windows::fs::symlink_file("../b.txt", "a/c/b.txt").unwrap_or_else(|why| {
            println!("! {:?}", why.to_string());
        });
    }

    println!("`cat a/c/b.txt`");
    match cat(&Path::new("a/c/b.txt")) {
        Err(why) => println!("! {:?}", why.kind()),
        Ok(s) => println!("> {}", s),
    }

    println!("`ls a`");
    // 디렉토리 내용 읽기, `io::Result<Vec<Path>>` 반환
    match fs::read_dir("a") {
        Err(why) => println!("! {:?}", why.kind()),
        Ok(paths) => for path in paths {
            println!("> {:?}", path.unwrap().path());
        },
    }

    println!("`rm a/c/e.txt`");
    // 파일 삭제, `io::Result<()>` 반환
    fs::remove_file("a/c/e.txt").unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });

    println!("`rmdir a/c/d`");
    // 비어있는 디렉토리 삭제, `io::Result<()>` 반환
```rust
fn main() {
    fs::remove_dir("a/c/d").unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });
}

```

예상되는 성공적인 출력은 다음과 같습니다.

```shell
$ rustc fs.rs && ./fs
`mkdir a`
`echo hello > a/b.txt`
`mkdir -p a/c/d`
`touch a/c/e.txt`
`ln -s ../b.txt a/c/b.txt`
`cat a/c/b.txt`
> hello
`ls a`
> "a/b.txt"
> "a/c"
`rm a/c/e.txt`
`rmdir a/c/d`
```

그리고 `a` 디렉토리의 최종 상태는 다음과 같습니다.

```shell
$ tree a
a
|-- b.txt
`-- c
    `-- b.txt -> ../b.txt

1 directory, 2 files
```

`cat` 함수를 정의하는 또 다른 방법은 `?` 표현법을 사용하는 것입니다.

```rust,ignore
fn cat(path: &Path) -> io::Result<String> {
    let mut f = File::open(path)?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
```

### 참조:

[`cfg!`][cfg]

[cfg]: ../attribute/cfg.md
