## Iterator::any

`Iterator::any`는 이터레이터에 전달되면, 조건을 만족하는 임의의 요소가 있는지 확인하여 `true`를 반환합니다. 그렇지 않으면 `false`를 반환합니다. 아래는 그 구조입니다.

```rust,ignore
pub trait Iterator {
    // 이터레이션 대상 타입.
    type Item;

    // `any`는 `&mut self`를 받아, 호출자는 대여받고 수정될 수 있지만 소비되지 않습니다.
    fn any<F>(&mut self, f: F) -> bool where
        // `FnMut`는 캡쳐된 변수가 최대 수정될 수 있지만 소비되지 않는다는 의미입니다. `Self::Item`은 클로저에 값으로 인수가 전달된다는 것을 나타냅니다.
        F: FnMut(Self::Item) -> bool;
}
```

```rust,editable
fn main() {
    let vec1 = vec![1, 2, 3];
    let vec2 = vec![4, 5, 6];

    // `iter()`는 `&i32`를 생성합니다. 해체하여 `i32`로 사용합니다.
    println!("2 in vec1: {}", vec1.iter()     .any(|&x| x == 2));
    // `into_iter()`는 `i32`를 생성합니다. 해체가 필요하지 않습니다.
    println!("2 in vec2: {}", vec2.into_iter().any(|x| x == 2));

    // `iter()`는 `vec1`과 그 요소를 대여만 하므로 다시 사용할 수 있습니다.
    println!("vec1 len: {}", vec1.len());
    println!("vec1의 첫 번째 요소는: {}", vec1[0]);
    // `into_iter()`는 `vec2`와 그 요소를 이동시키므로 다시 사용할 수 없습니다.
    // println!("vec2의 첫 번째 요소는: {}", vec2[0]);
    // println!("vec2 len: {}", vec2.len());
    // TODO: 위 두 줄을 해제하고 컴파일 오류를 확인하세요.

    let array1 = [1, 2, 3];
    let array2 = [4, 5, 6];

    // `iter()`는 `&i32`를 생성합니다.
    println!("2 in array1: {}", array1.iter()     .any(|&x| x == 2));
    // `into_iter()`는 `i32`를 생성합니다.
    println!("2 in array2: {}", array2.into_iter().any(|x| x == 2));
}
```

### 참조

[`std::iter::Iterator::any`][any]

[any]: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.any
