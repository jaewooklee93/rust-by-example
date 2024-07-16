## 문서

`cargo doc`를 사용하여 `target/doc` 디렉터리에 문서를 생성하고, `cargo doc --open`은 문서를 웹 브라우저에서 자동으로 열 수 있습니다.

`cargo test`를 사용하여 모든 테스트(문서 테스트 포함)를 실행하고, `cargo test --doc`를 사용하여 문서 테스트만 실행할 수 있습니다.

이러한 명령은 필요에 따라 `rustdoc` (및 `rustc`)를 적절하게 호출합니다.

## 문서 주석

문서 주석은 문서화가 필요한 큰 프로젝트에 매우 유용합니다. `rustdoc`를 실행할 때 이 주석이 문서로 컴파일됩니다. `///`로 표시되며 [Markdown]을 지원합니다.

````rust,editable,ignore
#![crate_name = "doc"]

/// 여기서 인간을 나타냅니다
pub struct Person {
    /// 이름은 반드시 있어야 합니다. 줄리엣이 그것을 싫어하더라도
    name: String,
}

impl Person {
    /// 주어진 이름으로 사람을 만듭니다.
    ///
    /// # 예제
    ///
    /// ```
    /// // 주석 내부에 울타리 사이에 Rust 코드를 넣을 수 있습니다.
    /// // `rustdoc`에 `--test`를 전달하면 테스트를 위해서도 실행됩니다!
    /// use doc::Person;
    /// let person = Person::new("name");
    /// ```
    pub fn new(name: &str) -> Person {
        Person {
            name: name.to_string(),
        }
    }

    /// 친절한 인사를 전달합니다!
    ///
    /// `Person`에 호출된 이름에 "Hello, [name](Person::name)"을 말합니다.
    pub fn hello(&self) {
        println!("Hello, {}!", self.name);
    }
}

fn main() {
    let john = Person::new("John");

    john.hello();
}
````

테스트를 실행하려면 먼저 라이브러리로 코드를 빌드한 다음 `rustdoc`에 라이브러리를 찾을 위치를 알려주어 각 doctest 프로그램에 연결할 수 있습니다.

```shell
$ rustc doc.rs --crate-type lib
$ rustdoc --test --extern doc="libdoc.rlib" doc.rs
```

## 문서 속성

다음은 `rustdoc`와 함께 사용되는 가장 일반적인 `#[doc]` 속성의 몇 가지 예입니다.

### `inline`

문서를 링크 대신에 인라인으로 표시하는 데 사용됩니다.

```rust,ignore
#[doc(inline)]
pub use bar::Bar;

/// bar 문서
pub mod bar {
    /// Bar에 대한 문서
    pub struct Bar;
}
```

### `no_inline`

링크를 따로 페이지로 연결하거나 어디에도 연결하지 않도록 사용됩니다.

```rust,ignore
// libcore/prelude에서의 예시
#[doc(no_inline)]
pub use crate::mem::drop;
```

### `hidden`

이 속성을 사용하면 `rustdoc`가 이 내용을 문서에 포함하지 않도록 합니다.

```rust,editable,ignore
// futures-rs 라이브러리에서의 예시
#[doc(hidden)]
pub use self::async_await::*;
```

문서 작성에 있어 `rustdoc`는 커뮤니티에서 널리 사용됩니다. [std 라이브러리 문서](https://doc.rust-lang.org/std/)를 생성하는 데 사용됩니다.

### 참조

- [The Rust Book: 유용한 문서 주석 만들기](https://doc.rust-lang.org/book/ch14-02-publishing-to-crates-io.html#making-useful-documentation-comments)
- [The rustdoc Book](https://doc.rust-lang.org/rustdoc/index.html)
- [참조: 문서 주석](https://doc.rust-lang.org/stable/reference/comments.html#doc-comments)
- [RFC 1574: API 문서 작성 규칙](https://rust-lang.github.io/rfcs/1574-more-api-documentation-conventions.html#appendix-a-full-conventions-text)
- [RFC 1946: 문서 주석에서 다른 항목으로의 상대 링크 (내부 Rustdoc 링크)](https://rust-lang.github.io/rfcs/1946-intra-rustdoc-links.html)
- [Is there any documentation style guide for comments? (reddit)](https://www.reddit.com/r/rust/comments/38888j/is_there_any_documentation_style_guide_for_comments/)

[markdown]: https://ko.wikipedia.org/wiki/Markdown
[book]: https://doc.rust-lang.org/book/ch14-02-publishing-to-crates-io.html#making-useful-documentation-comments
[ref-comments]: https://doc.rust-lang.org/stable/reference/comments.html#doc-comments
[rustdoc-book]: https://doc.rust-lang.org/rustdoc/index.html
[api-conv]: https://rust-lang.github.io/rfcs/1574-more-api-documentation-conventions.html#appendix-a-full-conventions-text
[intra-links]: https://rust-lang.github.io/rfcs/1946-intra-rustdoc-links.html
[reddit]: https://www.reddit.com/r/rust/comments/38888j/is_there_any_documentation_style_guide_for_comments/**[reddit]:** https://www.reddit.com/r/rust/comments/ahb50s/is_there_any_documentation_style_guide_for/
