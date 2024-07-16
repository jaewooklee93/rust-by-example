## 놀이터

[Rust 놀이터](https://play.rust-lang.org/)는 웹 인터페이스를 통해 Rust 코드를 실험하는 방법입니다.

## `mdbook`와의 사용

[`mdbook`][mdbook]에서 코드 예제를 실행 가능하고 편집 가능하게 만들 수 있습니다.

```rust,editable
fn main() {
    println!("Hello World!");
}
```

이렇게 하면 독자는 코드 샘플을 실행할 수 있을 뿐만 아니라 수정하고 조정할 수 있습니다. 여기서 중요한 것은 코드 블록에 `editable`라는 단어를 쉼표로 구분하여 추가하는 것입니다.

````markdown
```rust,editable
//...코드를 여기에 넣으세요
```
````

또한, `mdbook`가 코드를 빌드하고 테스트할 때 건너뛰도록 하려면 `ignore`를 추가할 수 있습니다.

````markdown
```rust,editable,ignore
//...코드를 여기에 넣으세요
```
````

## 문서와의 사용

[공식 Rust 문서][official-rust-docs]에서 일부는 "실행"이라는 버튼이 있는데, 이 버튼을 누르면 Rust 놀이터에서 새 탭으로 코드 샘플이 열립니다. 이 기능은 `#[doc]` 속성인 [`html_playground_url`][html-playground-url]을 사용하면 활성화됩니다.

```
#![doc(html_playground_url = "https://play.rust-lang.org/")]
//! ```
//! println!("Hello World");
//! ```
```

### 참조

- [Rust 놀이터][rust-playground]
- [Rust 놀이터 GitHub][rust-playground-github]
- [rustdoc 책][rustdoc-book]

[rust-playground]: https://play.rust-lang.org/
[rust-playground-github]: https://github.com/integer32llc/rust-playground/
[mdbook]: https://github.com/rust-lang/mdBook
[official-rust-docs]: https://doc.rust-lang.org/core/
[rustdoc-book]: https://doc.rust-lang.org/rustdoc/what-is-rustdoc.html
[html-playground-url]: https://doc.rust-lang.org/rustdoc/write-documentation/the-doc-attribute.html#html_playground_url
