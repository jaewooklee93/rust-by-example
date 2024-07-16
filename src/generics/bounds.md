## 제약 조건

제네릭을 사용할 때, 유형 매개변수는 종종 *제약 조건*으로서 트레이트를 사용해야 합니다.
제약 조건은 유형이 어떤 기능을 구현하는지 명시합니다. 예를 들어, 다음 예제는 `Display` 트레이트를 사용하여 출력하고 따라서 `T`가 `Display`에 의해 제약되어야 합니다.
즉, `T`는 반드시 `Display`를 구현해야 합니다.

```rust,ignore
// `Display` 트레이트를 구현하는 유형 `T`를 받는 `printer` 함수 정의.
fn printer<T: Display>(t: T) {
    println!("{}", t);
}
```

제약 조건은 제네릭을 구현하는 유형을 제한합니다. 즉,

```rust,ignore
struct S<T: Display>(T);

// `Display` 트레이트를 구현하지 않는 `Vec<T>`는 오류.
let s = S(vec![1]);
```

또 다른 효과로 제약 조건은 제네릭 인스턴스가 트레이트에 정의된 메서드에 액세스할 수 있도록 합니다.
예를 들어,

```rust,editable
// `Debug` 트레이트를 구현하는 트레이트.
use std::fmt::Debug;

trait HasArea {
    fn area(&self) -> f64;
}

impl HasArea for Rectangle {
    fn area(&self) -> f64 { self.length * self.height }
}

#[derive(Debug)]
struct Rectangle { length: f64, height: f64 }
#[allow(dead_code)]
struct Triangle  { length: f64, height: f64 }

// `T`는 `Debug` 트레이트를 구현해야 합니다. 유형에 관계없이 이 코드는 제대로 작동합니다.
fn print_debug<T: Debug>(t: &T) {
    println!("{:?}", t);
}

// `T`는 `HasArea` 트레이트를 구현해야 합니다. 제약 조건을 충족하는 모든 유형은 `HasArea` 함수 `area`에 액세스할 수 있습니다.
fn area<T: HasArea>(t: &T) -> f64 { t.area() }

fn main() {
    let rectangle = Rectangle { length: 3.0, height: 4.0 };
    let _triangle = Triangle  { length: 3.0, height: 4.0 };

    print_debug(&rectangle);
    println!("Area: {}", area(&rectangle));

    //print_debug(&_triangle);
    //println!("Area: {}", area(&_triangle));
    // ^ TODO: 위 코드를 주석을 해제해 보세요.
    // | 오류: `Debug` 또는 `HasArea`를 구현하지 않습니다.
}
```

추가적으로, [`where`][where] 절을 사용하여 더욱 표현력 있는 제약 조건을 적용할 수 있습니다.

### 참조:

[`std::fmt`][fmt], [`struct`s][structs], and [`trait`s][traits]

[fmt]: ../hello/print.md
[methods]: ../fn/methods.md
[structs]: ../custom_types/structs.md
[traits]: ../trait.md
[where]: ../generics/where.md
