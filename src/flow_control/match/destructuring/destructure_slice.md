## 배열/슬라이스

튜플과 마찬가지로 배열과 슬라이스도 이런 방식으로 해체할 수 있습니다.

```rust,editable
fn main() {
    // 배열의 값을 변경하거나 슬라이스로 만들어 보세요!
    let array = [1, -2, 6];

    match array {
        // 두 번째와 세 번째 요소를 각각 변수에 바인딩
        [0, second, third] =>
            println!("array[0] = 0, array[1] = {}, array[2] = {}", second, third),

        // _로 쓸 수 있는 값은 무시할 수 있습니다.
        [1, _, third] => println!(
            "array[0] = 1, array[2] = {} and array[1] was ignored",
            third
        ),

        // 몇 개를 바인딩하고 나머지를 무시할 수도 있습니다.
        [-1, second, ..] => println!(
            "array[0] = -1, array[1] = {} and all the other ones were ignored",
            second
        ),
        // 아래 코드는 컴파일되지 않을 것입니다.
        // [-1, second] => ...

        // 또는 다른 배열/슬라이스에 저장할 수 있습니다. (값의 유형에 따라 유형이 달라집니다)
        [3, second, tail @ ..] => println!(
            "array[0] = 3, array[1] = {} and the other elements were {:?}",
            second, tail
        ),

        // 이러한 패턴을 결합하면 첫 번째와 마지막 값을 바인딩하고 나머지를 하나의 배열에 저장할 수 있습니다.
        [first, middle @ .., last] => println!(
            "array[0] = {}, middle = {:?}, array[2] = {}",
            first, middle, last
        ),
    }
}
```

### 참조:

[배열 및 슬라이스](../../../primitives/array.md) 및 `@` 기호의 [바인딩](../binding.md)
