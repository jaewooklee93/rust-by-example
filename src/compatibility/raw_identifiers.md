## 원시 식별자

Rust는 많은 프로그래밍 언어와 마찬가지로 "키워드"라는 개념을 가지고 있습니다.
이러한 식별자는 언어에 의미를 가지므로 변수 이름, 함수 이름과 같은 곳에서 사용할 수 없습니다.
원시 식별자는 키워드를 일반적으로 허용되지 않는 곳에서 사용할 수 있도록 해줍니다.
이는 Rust가 새로운 키워드를 도입할 때 특히 유용하며, 오래된 버전의 Rust를 사용하는 라이브러리가 새로운 버전에서 도입된 키워드와 동일한 이름을 가진 변수 또는 함수를 가지고 있을 때 유용합니다.

예를 들어, 2015년 버전의 Rust로 컴파일된 crate `foo`를 생각해 보세요. 이 crate는 `try`라는 이름의 함수를 내보냅니다. 이 키워드는 2018년 버전에서 새롭게 도입된 기능을 위해 예약되어 있으므로, 원시 식별자가 없다면 함수를 이름 지을 방법이 없습니다.

```rust,ignore
extern crate foo;

fn main() {
    foo::try();
}
```

다음과 같은 오류가 발생합니다.

```text
error: expected identifier, found keyword `try`
 --> src/main.rs:4:4
  |
4 | foo::try();
  |      ^^^ expected identifier, found keyword
```

원시 식별자를 사용하면 다음과 같이 작성할 수 있습니다.

```rust,ignore
extern crate foo;

fn main() {
    foo::r#try();
}
```
