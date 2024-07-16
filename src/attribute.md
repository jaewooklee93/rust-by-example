## 속성

속성은 모듈, 크레이트 또는 항목에 적용되는 메타데이터입니다. 이 메타데이터는 다음과 같은 용도로 사용될 수 있습니다.

<!-- TODO: 이들을 각각의 예제로 연결하세요 -->

* 코드의 조건적 컴파일 [cfg]
* 크레이트 이름, 버전 및 유형(이진 파일 또는 라이브러리) 설정 [crate]
* [lint] (경고) 비활성화
* 컴파일러 기능(매크로, 글로벌 임포트 등) 활성화
* 외래 라이브러리 연결
* 함수를 단위 테스트로 표시
* 벤치마크에 포함될 함수를 표시
* [속성과 유사한 매크로] [macros]

속성은 `#[outer_attribute]` 또는 `#![inner_attribute]`와 같이 표시되며,
차이점은 어디에 적용되는지에 있습니다.

- `#[outer_attribute]`는 바로 뒤에 있는 [항목]에 적용됩니다. 항목의 예로는 함수, 모듈 선언, 상수, 구조체, 열거형이 있습니다. `#[derive(Debug)]` 속성이 `Rectangle` 구조체에 적용되는 예시입니다:
  ```rust
  #[derive(Debug)]
  struct Rectangle {
      width: u32,
      height: u32,
  }
  ```

- `#![inner_attribute]`는 둘러싸는 [항목]에 적용됩니다 (일반적으로 모듈 또는 크레이트). 즉, 이 속성은 놓인 범위 전체에 적용되는 것으로 해석됩니다. `#![allow(unused_variables)]`가 `main.rs`에 있는 경우 전체 크레이트에 적용되는 예시입니다:
  ```rust
  #![allow(unused_variables)]

  fn main() {
      let x = 3; // 이것은 일반적으로 사용되지 않는 변수에 대한 경고를 표시합니다.
  }
  ```

속성은 다양한 문법으로 인수를 받을 수 있습니다.

* `#[attribute = "value"]`
* `#[attribute(key = "value")]`
* `#[attribute(value)]`

속성은 여러 값을 가지고 있으며, 여러 줄에 걸쳐 분리할 수도 있습니다.

```rust,ignore
#[attribute(value, value2)]


#[attribute(value, value2, value3,
            value4, value5)]
```

[cfg]: attribute/cfg.md
[crate]: attribute/crate.md
[item]: https://doc.rust-lang.org/stable/reference/items.html
[lint]: https://en.wikipedia.org/wiki/Lint_%28software%29
[macros]: https://doc.rust-lang.org/book/ch19-06-macros.html#attribute-like-macros
