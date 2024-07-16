## 경로

`Path` 구조체는 기본 파일 시스템에서 파일 경로를 나타냅니다. `Path`에는 두 가지 유형이 있습니다. `posix::Path`는 UNIX 계열 시스템에 사용되며, `windows::Path`는 Windows에 사용됩니다.  프리로드는 적절한 플랫폼에 맞는 `Path` 변형을 내보냅니다.

`Path`는 `OsStr`에서 생성되며, 경로가 가리키는 파일/디렉터리에 대한 정보를 얻는 여러 메서드를 제공합니다.

`Path`는 변경할 수 없습니다. `Path`의 소유된 버전은 `PathBuf`입니다. `Path`와 `PathBuf`의 관계는 `str`과 `String`과 유사합니다. `PathBuf`는 자리에 변경할 수 있으며, `Path`로 해제할 수 있습니다.

`Path`는 내부적으로 UTF-8 문자열로 표현되지 않습니다. 대신 `OsString`으로 저장됩니다. 따라서 `Path`를 `&str`로 변환하는 것은 무료하지 않으며 실패할 수 있습니다. (옵션이 반환됩니다). 그러나 `Path`는 `into_os_string`과 `as_os_str`을 사용하여 `OsString` 또는 `&OsStr`로 자유롭게 변환할 수 있습니다.

```rust,editable
use std::path::Path;

fn main() {
    // `&'static str`에서 `Path` 생성
    let path = Path::new(".");

    // `display` 메서드는 `Display` 가능한 구조체를 반환합니다.
    let _display = path.display();

    // `join`은 OS에 따라 구분자를 사용하여 경로를 다른 경로와 병합하고 `PathBuf`를 반환합니다.
    let mut new_path = path.join("a").join("b");

    // `push`는 `PathBuf`에 `&Path`를 추가합니다.
    new_path.push("c");
    new_path.push("myfile.tar.gz");

    // `set_file_name`은 `PathBuf`의 파일 이름을 업데이트합니다.
    new_path.set_file_name("package.tgz");

    // `PathBuf`를 문자열 슬라이스로 변환
    match new_path.to_str() {
        None => panic!("새 경로는 유효한 UTF-8 문자열이 아닙니다"),
        Some(s) => println!("새 경로는 {}", s),
    }
}

```

`posix::Path` 또는 `windows::Path`의 다른 `Path` 메서드와 `Metadata` 구조체를 확인하십시오.

### 참조:

[OsStr][1] 및 [Metadata][2].

[1]: https://doc.rust-lang.org/std/ffi/struct.OsStr.html
[2]: https://doc.rust-lang.org/std/fs/struct.Metadata.html
