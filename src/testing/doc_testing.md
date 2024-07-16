## 문서 테스트

Rust 프로젝트를 문서화하는 주요 방법은 소스 코드에 첨삭을 추가하는 것입니다.
문서 코멘트는 [CommonMark Markdown 사양][commonmark]을 사용하며 코드 블록을 지원합니다.
Rust는 정확성을 중요하게 생각하기 때문에 이러한 코드 블록은 컴파일되고 문서 테스트로 사용됩니다.

```rust,ignore
/// 함수를 간략하게 설명하는 첫 번째 줄입니다.
///
/// 다음 줄은 자세한 설명을 제공합니다. 코드 블록은 세 개의 백틱으로 시작하며 `fn main()`이 내부에 암시적으로 있고 `extern crate <cratename>`이 있습니다. `doccomments` crate를 테스트하는 것으로 가정해 보겠습니다.
///
/// ```
/// let result = doccomments::add(2, 3);
/// assert_eq!(result, 5);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

/// 일반적으로 문서 코멘트에는 "예제", "Panics" 및 "Failures"와 같은 섹션이 포함될 수 있습니다.
///
/// 다음 함수는 두 개의 숫자를 나눕니다.
///
/// # 예제
///
/// ```
/// let result = doccomments::div(10, 2);
/// assert_eq!(result, 5);
/// ```
///
/// # Panics
///
/// 두 번째 인자가 0이면 함수가 panic합니다.
///
/// ```rust,should_panic
/// // 0으로 나누는 경우 panic
/// doccomments::div(10, 0);
/// ```
pub fn div(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("Divide-by-zero error");
    }

    a / b
}
```

문서에 있는 코드 블록은 `cargo test` 명령을 실행할 때 자동으로 테스트됩니다.

```shell
$ cargo test
running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

   Doc-tests doccomments

running 3 tests
test src/lib.rs - add (line 7) ... ok
test src/lib.rs - div (line 21) ... ok
test src/lib.rs - div (line 31) ... ok

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

## 문서 테스트의 동기

문서 테스트의 주요 목적은 예제로서 기능을 테스트하는 것입니다. 이는 가장 중요한 [가이드라인][question-instead-of-unwrap] 중 하나입니다.
이는 문서에서의 예제를 완전한 코드 스니펫으로 사용할 수 있도록 합니다. 하지만 `?`를 사용하면 `main`이 `unit`를 반환하기 때문에 컴파일이 실패합니다. 문서에서 일부 소스 코드 줄을 숨길 수 있는 기능이 도움이 됩니다. 예를 들어 `fn try_main() -> Result<(), ErrorType>`를 작성하고, 숨기고 `unwrap`할 수 있습니다. 복잡해 보이지만, 예시를 보여드리겠습니다.

```rust,ignore
/// 숨겨진 `try_main`을 사용한 문서 테스트.
///
/// ```
/// # // `#` 기호로 시작하는 숨겨진 줄은 여전히 컴파일 가능합니다!
/// # fn try_main() -> Result<(), String> { // 문서에 표시되는 몸체를 감싸는 줄
/// let res = doccomments::try_div(10, 2)?;
/// # Ok(()) // try_main에서 반환
/// # }
/// # fn main() { // try_main을 호출하고 unwrap하는 main
/// #    try_main().unwrap(); // 오류 발생 시 테스트가 panic
/// #                         // 하도록 하기 위해
/// # }
/// ```
pub fn try_div(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Divide-by-zero"))
    } else {
        Ok(a / b)
    }
}
```

## 참조

* [RFC505][RFC505] 문서 스타일
* [API 가이드라인][doc-nursery] 문서 작성 가이드라인

[doc-nursery]: https://rust-lang-nursery.github.io/api-guidelines/documentation.html
[commonmark]: https://commonmark.org/
[RFC505]: https://github.com/rust-lang/rfcs/blob/master/text/0505-api-comment-conventions.md
