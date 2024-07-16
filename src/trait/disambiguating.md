## 중복되는 트레이트 해결

한 유형은 여러 트레이트를 구현할 수 있습니다. 두 트레이트가 동일한 함수 이름을 요구하는 경우가 있을 수 있습니다. 예를 들어, 많은 트레이트가 `get()`이라는 메서드를 가질 수 있으며, 반환 유형이 다를 수도 있습니다!

좋은 소식은 각 트레이트 구현이 자신의 `impl` 블록을 가져오기 때문에, 어떤 트레이트의 `get` 메서드를 구현하는지 명확하기 때문입니다.

하지만 메서드를 _호출_할 때는 어떻게 해야 할까요? 중복되는 메서드를 구분하기 위해서는 Fully Qualified Syntax를 사용해야 합니다.

```rust,editable
trait UsernameWidget {
    // 이 위젯에서 선택된 사용자 이름 가져오기
    fn get(&self) -> String;
}

trait AgeWidget {
    // 이 위젯에서 선택된 나이 가져오기
    fn get(&self) -> u8;
}

// UsernameWidget과 AgeWidget을 모두 가진 양식
struct Form {
    username: String,
    age: u8,
}

impl UsernameWidget for Form {
    fn get(&self) -> String {
        self.username.clone()
    }
}

impl AgeWidget for Form {
    fn get(&self) -> u8 {
        self.age
    }
}

fn main() {
    let form = Form {
        username: "rustacean".to_owned(),
        age: 28,
    };

    // 이 줄을 주석 처리하면 "get"이 여러 개 있다는 오류가 발생합니다.
    // 왜냐하면 실제로 `get`이라는 이름의 메서드가 여러 개 있기 때문입니다.
    // println!("{}", form.get());

    let username = <Form as UsernameWidget>::get(&form);
    assert_eq!("rustacean".to_owned(), username);
    let age = <Form as AgeWidget>::get(&form);
    assert_eq!(28, age);
}
```

### 참조:

[Rust 프로그래밍 언어의 Fully Qualified Syntax 챕터][trpl_fqsyntax]

[trpl_fqsyntax]: https://doc.rust-lang.org/book/ch19-03-advanced-traits.html#fully-qualified-syntax-for-disambiguation-calling-methods-with-the-same-name
