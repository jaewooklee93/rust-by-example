## 반복자를 통한 검색

`Iterator::find`는 반복자를 순회하며 특정 조건을 충족하는 첫 번째 값을 검색하는 함수입니다. 조건을 충족하는 값이 없으면 `None`을 반환합니다. 함수의 형식은 다음과 같습니다.

```rust,ignore
pub trait Iterator {
    // 반복되는 자료형.
    type Item;

    // `find`는 `&mut self`를 받아서 호출자는 대여받을 수 있고
    // 수정될 수 있지만 소비되지 않습니다.
    fn find<P>(&mut self, predicate: P) -> Option<Self::Item> where
        // `FnMut`는 캡처된 변수가 최대 수정될 수 있음을 의미하며,
        // 소비되지 않습니다. `&Self::Item`은 폐쇄에 대한 참조를 전달한다는 것을 의미합니다.
        P: FnMut(&Self::Item) -> bool;
}
```

```rust,editable
fn main() {
    let vec1 = vec![1, 2, 3];
    let vec2 = vec![4, 5, 6];

    // `iter()`는 `&i32`를 생성합니다.
    let mut iter = vec1.iter();
    // `into_iter()`는 `i32`를 생성합니다.
    let mut into_iter = vec2.into_iter();

    // `iter()`는 `&i32`를 생성하고, 우리는 그 중 하나의 항목을 참조하고 싶으므로
    // `&&i32`를 `i32`로 해체해야 합니다.
    println!("Find 2 in vec1: {:?}", iter     .find(|&&x| x == 2));
    // `into_iter()`는 `i32`를 생성하고, 우리는 그 중 하나의 항목을 참조하고 싶으므로
    // `&i32`를 `i32`로 해체해야 합니다.
    println!("Find 2 in vec2: {:?}", into_iter.find(| &x| x == 2));

    let array1 = [1, 2, 3];
    let array2 = [4, 5, 6];

    // `iter()`는 `&&i32`를 생성합니다.
    println!("Find 2 in array1: {:?}", array1.iter()     .find(|&&x| x == 2));
    // `into_iter()`는 `&i32`를 생성합니다.
    println!("Find 2 in array2: {:?}", array2.into_iter().find(|&x| x == 2));
}
```

`Iterator::find`는 항목에 대한 참조를 제공합니다. 하지만 항목의 _인덱스_를 원하는 경우 `Iterator::position`을 사용하십시오.

```rust,editable
fn main() {
    let vec = vec![1, 9, 3, 3, 13, 2];

    // `iter()`는 `&i32`를 생성하고 `position()`은 참조를 받지 않으므로
    // `&i32`를 `i32`로 해체해야 합니다.
    let index_of_first_even_number = vec.iter().position(|&x| x % 2 == 0);
    assert_eq!(index_of_first_even_number, Some(5));
    
    // `into_iter()`는 `i32`를 생성하고 `position()`은 참조를 받지 않으므로
    // 해체할 필요가 없습니다.
    let index_of_first_negative_number = vec.into_iter().position(|x| x < 0);
    assert_eq!(index_of_first_negative_number, None);
}
```

### 참조

[`std::iter::Iterator::find`][find]

[`std::iter::Iterator::find_map`][find_map]

[`std::iter::Iterator::position`][position]

[`std::iter::Iterator::rposition`][rposition]

[find]: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.find
[find_map]: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.find_map
[position]: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.position
[rposition]: https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.rposition
