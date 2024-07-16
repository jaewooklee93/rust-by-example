## 구조체

`struct`도 마찬가지로 다음과 같이 해체할 수 있습니다.

```rust,editable
fn main() {
    struct Foo {
        x: (u32, u32),
        y: u32,
    }

    // x, y 값을 변경하여 결과를 확인해보세요
    let foo = Foo { x: (1, 2), y: 3 };

    match foo {
        Foo { x: (1, b), y } => println!("x의 첫 번째 값은 1입니다, b = {}, y = {} ", b, y),

        // 구조체를 해체하면서 변수 이름을 변경할 수 있습니다.
        // 순서는 중요하지 않습니다.
        Foo { y: 2, x: i } => println!("y는 2입니다, i = {:?}", i),

        // 일부 변수를 무시할 수도 있습니다.
        Foo { y, .. } => println!("y = {}, x는 무시합니다", y),
        // 이것은 오류를 발생시킵니다: 패턴은 `x` 필드를 언급하지 않습니다.
        //Foo { y } => println!("y = {}", y),
    }

    let faa = Foo { x: (1, 2), y: 3 };

    // `match` 블록 없이도 구조체를 해체할 수 있습니다.
    let Foo { x : x0, y: y0 } = faa;
    println!("외부: x0 = {x0:?}, y0 = {y0}");

    // 중첩된 구조체에도 해체가 작동합니다.
    struct Bar {
        foo: Foo,
    }

    let bar = Bar { foo: faa };
    let Bar { foo: Foo { x: nested_x, y: nested_y } } = bar;
    println!("중첩된: nested_x = {nested_x:?}, nested_y = {nested_y:?}");
}
```

### 참조:

[구조체](../../../custom_types/structs.md)
