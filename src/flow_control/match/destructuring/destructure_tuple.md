## 튜플

`match`에서 튜플을 해체할 수 있습니다.

```rust,editable
fn main() {
    let triple = (0, -2, 3);
    // TODO ^ `triple`에 다른 값을 시도해보세요

    println!("Tell me about {:?}", triple);
    // `match`를 사용하여 튜플을 해체할 수 있습니다.
    match triple {
        // 두 번째 및 세 번째 요소를 해체합니다.
        (0, y, z) => println!("First is `0`, `y` is {:?}, and `z` is {:?}", y, z),
        (1, ..)  => println!("First is `1` and the rest doesn't matter"),
        (.., 2)  => println!("last is `2` and the rest doesn't matter"),
        (3, .., 4)  => println!("First is `3`, last is `4`, and the rest doesn't matter"),
        // `..`는 튜플의 나머지를 무시하는 데 사용할 수 있습니다.
        _      => println!("It doesn't matter what they are"),
        // `_`는 값을 변수에 바인딩하지 않는다는 의미입니다.
    }
}
```

### 참조:

[튜플](../../../primitives/tuples.md)
