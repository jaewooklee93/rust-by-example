## 테스트 케이스: 연결 리스트

연결 리스트를 구현하는 일반적인 방법은 `enum`을 사용하는 것입니다.

```rust,editable
use crate::List::*;

enum List {
    // Cons: 요소와 다음 노드를 가리키는 포인터를 감싼 튜플 구조
    Cons(u32, Box<List>),
    // Nil: 연결 리스트의 끝을 나타내는 노드
    Nil,
}

// enum에 메서드를 연결할 수 있습니다.
impl List {
    // 빈 리스트를 생성합니다.
    fn new() -> List {
        // `Nil`은 `List` 유형입니다.
        Nil
    }

    // 리스트를 소비하고, 앞쪽에 새로운 요소를 가진 동일한 리스트를 반환합니다.
    fn prepend(self, elem: u32) -> List {
        // `Cons` 또한 `List` 유형입니다.
        Cons(elem, Box::new(self))
    }

    // 리스트의 길이를 반환합니다.
    fn len(&self) -> u32 {
        // `self`는 일치해야 합니다. 왜냐하면 이 메서드의 동작은 `self`의 변형에 따라 다르기 때문입니다.
        // `self`는 `&List` 유형이며, `*self`는 `List` 유형입니다. 구체적인 유형 `T`에 대한 일치는 참조 `&T`에 대한 일치보다 선호됩니다.
        // Rust 2018 이후에는 `self`를 여기서 사용하고 `tail` (참조 없이) 아래에서도 사용할 수 있습니다.
        // Rust는 `&s`와 `ref tail`를 추론합니다.
        // https://doc.rust-lang.org/edition-guide/rust-2018/ownership-and-lifetimes/default-match-bindings.html 참조
        match *self {
            // `tail`의 소유권을 취할 수 없습니다. 왜냐하면 `self`가 대여되었기 때문입니다.
            // 대신 `tail`에 대한 참조를 취합니다.
            Cons(_, ref tail) => 1 + tail.len(),
            // 기본 사례: 빈 리스트는 길이가 0입니다.
            Nil => 0
        }
    }

    // 리스트를 (힙 할당된) 문자열로 반환합니다.
    fn stringify(&self) -> String {
        match *self {
            Cons(head, ref tail) => {
                // `format!`는 `print!`와 유사하지만, 콘솔에 출력하는 대신 힙에 할당된 문자열을 반환합니다.
                format!("{}, {}", head, tail.stringify())
            },
            Nil => {
                format!("Nil")
            },
        }
    }
}

fn main() {
    // 빈 연결 리스트를 생성합니다.
    let mut list = List::new();

    // 몇 가지 요소를 앞쪽에 추가합니다.
    list = list.prepend(1);
    list = list.prepend(2);
    list = list.prepend(3);

    // 리스트의 최종 상태를 표시합니다.
    println!("연결 리스트의 길이: {}", list.len());
    println!("{}", list.stringify());
}
```

### 참조:

[`Box`][box] 및 [메서드][methods]

[box]: ../../std/box.md
[methods]: ../../fn/methods.md
