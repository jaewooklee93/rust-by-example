## if let

일부 사용 사례에서, `match`가 어색할 때 `if let`이 유용합니다. 예를 들어:

```rust
// `optional`을 `Option<i32>` 타입으로 만듭니다.
let optional = Some(7);

match optional {
    Some(i) => println!("This is a really long string and `{:?}`", i),
    _ => {},
    // ^ `match`가 완전해야 하기 때문에 필요합니다. 낭비된 공간처럼 보이지 않나요?
};

```

`if let`는 이러한 사용 사례에 대해 깔끔하며, 여러 가지 실패 옵션을 지정할 수 있습니다.

```rust,editable
fn main() {
    // 모두 `Option<i32>` 타입입니다.
    let number = Some(7);
    let letter: Option<i32> = None;
    let emoticon: Option<i32> = None;

    // `if let` 구문은 "`let`이 `number`를 `Some(i)`로 해체하면 블록 (`{}`)을 평가한다"는 의미입니다.
    if let Some(i) = number {
        println!("Matched {:?}!", i);
    }

    // 실패를 지정해야 한다면 `else`를 사용합니다.
    if let Some(i) = letter {
        println!("Matched {:?}!", i);
    } else {
        // 해체 실패. 실패 케이스로 변경합니다.
        println!("숫자가 일치하지 않았습니다. 글자로 가겠습니다!");
    }

    // 다른 실패 조건을 제공합니다.
    let i_like_letters = false;

    if let Some(i) = emoticon {
        println!("Matched {:?}!", i);
    // 해체 실패. `else if` 조건을 평가하여 대체 실패 범위가 적용되어야 하는지 확인합니다:
    } else if i_like_letters {
        println!("숫자가 일치하지 않았습니다. 글자로 가겠습니다!");
    } else {
        // 조건이 거짓으로 평가되었습니다. 이 범위는 기본입니다:
        println!("글자를 좋아하지 않습니다. 이모티콘 :)으로 가겠습니다!");
    }
}
```

마찬가지로 `if let`은 모든 `enum` 값을 일치시키는 데 사용할 수 있습니다.

```rust,editable
// 우리의 예제 `enum`
enum Foo {
    Bar,
    Baz,
    Qux(u32)
}

fn main() {
    // 예제 변수를 생성합니다
    let a = Foo::Bar;
    let b = Foo::Baz;
    let c = Foo::Qux(100);
    
    // 변수 `a`는 `Foo::Bar`와 일치합니다
    if let Foo::Bar = a {
        println!("a is foobar");
    }
    
    // 변수 `b`는 `Foo::Bar`와 일치하지 않습니다
    // 따라서 아무것도 출력되지 않습니다
    if let Foo::Bar = b {
        println!("b is foobar");
    }
    
    // 변수 `c`는 `Foo::Qux`와 일치하며 값이 있습니다
    // 이전 예제의 `Some()`와 유사합니다
    if let Foo::Qux(value) = c {
        println!("c is {}", value);
    }

    // `if let`에서 바인딩도 작동합니다
    if let Foo::Qux(value @ 100) = c {
        println!("c is one hundred");
    }
}
```

또 다른 장점은 `if let`이 비 매개변수화된 `enum` 변이를 일치시킬 수 있다는 것입니다. `enum`이 `PartialEq`를 구현하거나 파생하지 않더라도 이는 가능합니다. 이러한 경우 `if Foo::Bar == a`는 컴파일 오류를 발생시키기 때문에 `enum` 인스턴스를 비교할 수 없지만, `if let`은 계속 작동합니다.

도전해 보시겠습니까? 다음 예제를 `if let`을 사용하여 수정해 보세요.

```rust,editable,ignore,mdbook-runnable
// 이 `enum`은 `PartialEq`를 구현하거나 파생하지 않습니다.
// 그래서 `Foo::Bar == a`가 아래에서 오류를 발생시킵니다.
enum Foo {Bar}

fn main() {
    let a = Foo::Bar;

    // 변수 `a`는 `Foo::Bar`와 일치합니다
    if Foo::Bar == a {
    // ^-- 이 부분은 컴파일 오류를 발생시킵니다. `if let`을 사용하세요.
        println!("a is foobar");
    }
}
```

### 참조

[`enum`][enum], [`Option`][option], and the [RFC][if_let_rfc]

[enum]: ../custom_types/enum.md
[if_let_rfc]: https://github.com/rust-lang/rfcs/pull/160
 [선택형]: ../std/option.md
