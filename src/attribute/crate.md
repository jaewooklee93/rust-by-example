## Crate

`crate_type` 속성은 컴파일러에게 crate가
이진 파일인지 라이브러리인지(그리고 심지어 라이브러리 유형까지)
을 알려줄 수 있습니다. `crate_name` 속성은 crate의 이름을 설정하는 데 사용됩니다.

그러나 `crate_type`과 `crate_name` 속성은 모두 Cargo, Rust 패키지 관리자를 사용할 때
**아무런 효과도 없다는 점**이 중요합니다. 대부분의 Rust 프로젝트에서 Cargo가 사용되기 때문에,
실제 세계에서 `crate_type`과 `crate_name`을 사용하는 경우는 상대적으로 제한적입니다.

```rust,editable
// 이 crate는 라이브러리입니다
#![crate_type = "lib"]
// 라이브러리는 "rary" 라는 이름입니다
#![crate_name = "rary"]

pub fn public_function() {
    println!("called rary's `public_function()`");
}

fn private_function() {
    println!("called rary's `private_function()`");
}

pub fn indirect_access() {
    print!("called rary's `indirect_access()`, that\n> ");

    private_function();
}
```

`crate_type` 속성을 사용하면 `--crate-type` 플래그를 `rustc`에 전달할 필요가 없습니다.

```shell
$ rustc lib.rs
$ ls lib*
library.rlib
```
