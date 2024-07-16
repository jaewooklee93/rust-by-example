## `open`

`open` 함수는 파일을 읽기 전용 모드로 열 수 있습니다.

`File`은 파일 디스크립터를 소유하고 `drop`될 때 파일을 닫는 데 책임을 져요.

```rust,editable,ignore
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

fn main() {
    // 원하는 파일의 경로를 생성합니다.
    let path = Path::new("hello.txt");
    let display = path.display();

    // 읽기 전용 모드로 경로를 열고, `io::Result<File>`를 반환합니다.
    let mut file = match File::open(&path) {
        Err(why) => panic!("{}를 열 수 없습니다: {}", display, why),
        Ok(file) => file,
    };

    // 파일 내용을 문자열로 읽고, `io::Result<usize>`를 반환합니다.
    let mut s = String::new();
    match file.read_to_string(&mut s) {
        Err(why) => panic!("{}를 읽을 수 없습니다: {}", display, why),
        Ok(_) => print!("{}에는 다음 내용이 있습니다:\n{}", display, s),
    }

    // `file`이 범위를 벗어나고, "hello.txt" 파일이 닫힙니다.
}
```

다음은 예상되는 성공적인 출력입니다.

```shell
$ echo "Hello World!" > hello.txt
$ rustc open.rs && ./open
hello.txt에는 다음 내용이 있습니다:\nHello World!
```

(`hello.txt`가 존재하지 않거나 `hello.txt`가 읽을 수 없음과 같은 다른 실패 조건에서 이전 예제를 테스트하는 것이 좋습니다.)
