## 라이브러리 만들기

라이브러리를 만들고 다른 crate에 연결하는 방법을 살펴보겠습니다.

`rary.rs`에 다음과 같이 작성합니다.

```rust,ignore
pub fn public_function() {
    println!("rary의 `public_function()`이 호출되었습니다");
}

fn private_function() {
    println!("rary의 `private_function()`이 호출되었습니다");
}

pub fn indirect_access() {
    print!("rary의 `indirect_access()`가 호출되었습니다, 그
> ");

    private_function();
}
```

```shell
$ rustc --crate-type=lib rary.rs
$ ls lib*
library.rlib
```

라이브러리는 "lib"로 시작하며, 기본적으로 crate 파일 이름으로 이름이 지정되지만, `rustc`에 `--crate-name` 옵션을 전달하거나 [`crate_name`
속성][crate-name]을 사용하여 기본 이름을 재정의할 수 있습니다.

[crate-name]: ../attribute/crate.md
