## ref 패턴

패턴 매칭 또는 `let` 바인딩을 통한 구조체/튜플의 필드를 해체할 때, `ref` 키워드를 사용하여 참조를 가져올 수 있습니다. 아래 예시는 이것이 유용한 경우의 몇 가지를 보여줍니다.

```rust,editable
#[derive(Clone, Copy)]
struct Point { x: i32, y: i32 }

fn main() {
    let c = 'Q';

    // 좌측에 `ref` 참조를 할당하는 것은 우측에 `&` 참조를 할당하는 것과 동일합니다.
    let ref ref_c1 = c;
    let ref_c2 = &c;

    println!("ref_c1 equals ref_c2: {}", *ref_c1 == *ref_c2);

    let point = Point { x: 0, y: 0 };

    // `ref`는 구조체를 해체할 때도 유효합니다.
    let _copy_of_x = {
        // `ref_to_x`는 `point`의 `x` 필드에 대한 참조입니다.
        let Point { x: ref ref_to_x, y: _ } = point;

        // `point`의 `x` 필드의 복사본을 반환합니다.
        *ref_to_x
    };

    // `point`의 변경 가능한 복사본
    let mut mutable_point = point;

    {
        // `ref`는 `mut`와 함께 사용되어 변경 가능한 참조를 가져올 수 있습니다.
        let Point { x: _, y: ref mut mut_ref_to_y } = mutable_point;

        // `mutable_point`의 `y` 필드를 변경 가능한 참조를 통해 변경합니다.
        *mut_ref_to_y = 1;
    }

    println!("point is ({}, {})", point.x, point.y);
    println!("mutable_point is ({}, {})", mutable_point.x, mutable_point.y);

    // 포인터를 포함하는 변경 가능한 튜플
    let mut mutable_tuple = (Box::new(5u32), 3u32);
    
    {
        // `mutable_tuple`을 해체하여 `last` 값을 변경합니다.
        let (_, ref mut last) = mutable_tuple;
        *last = 2u32;
    }
    
    println!("tuple is {:?}", mutable_tuple);
}
```
