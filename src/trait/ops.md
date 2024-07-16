## 연산자 오버로딩

Rust에서 많은 연산자는 트레이트를 통해 오버로딩될 수 있습니다. 즉, 일부 연산자는 입력 인수에 따라 다른 작업을 수행할 수 있습니다. 이는 연산자가 메서드 호출의 문법 설탕이기 때문입니다. 예를 들어, `a + b`에서 `+` 연산자는 `add` 메서드를 호출합니다(즉, `a.add(b)`). 이 `add` 메서드는 `Add` 트레이트의 일부입니다. 따라서 `+` 연산자는 `Add` 트레이트를 구현하는 모든 객체에서 사용될 수 있습니다.

`Add`와 같은 트레이트 목록은 [`core::ops`][ops]에서 찾을 수 있습니다.

```rust,editable
use std::ops;

struct Foo;
struct Bar;

#[derive(Debug)]
struct FooBar;

#[derive(Debug)]
struct BarFoo;

// `std::ops::Add` 트레이트는 `+` 연산의 기능을 지정하는 데 사용됩니다.
// 여기서는 `Add<Bar>` - RHS가 `Bar` 유형인 덧셈을 위한 트레이트입니다.
// 다음 블록은 `Foo + Bar = FooBar` 연산을 구현합니다.
impl ops::Add<Bar> for Foo {
    type Output = FooBar;

    fn add(self, _rhs: Bar) -> FooBar {
        println!("> Foo.add(Bar) was called");

        FooBar
    }
}

// 유형을 반전하여 비교역 연산 덧셈을 구현합니다.
// 여기서는 `Add<Foo>` - RHS가 `Foo` 유형인 덧셈을 위한 트레이트입니다.
// 이 블록은 `Bar + Foo = BarFoo` 연산을 구현합니다.
impl ops::Add<Foo> for Bar {
    type Output = BarFoo;

    fn add(self, _rhs: Foo) -> BarFoo {
        println!("> Bar.add(Foo) was called");

        BarFoo
    }
}

fn main() {
    println!("Foo + Bar = {:?}", Foo + Bar);
    println!("Bar + Foo = {:?}", Bar + Foo);
}
```

### 참조

[Add][add], [문법 색인][syntax]

[add]: https://doc.rust-lang.org/core/ops/trait.Add.html
[ops]: https://doc.rust-lang.org/core/ops/
[syntax]:https://doc.rust-lang.org/book/appendix-02-operators.html
