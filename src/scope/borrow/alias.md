## 별칭

데이터는 무결성을 유지하면서 여러 번 임시로 대여받을 수 있습니다. 그러나 무결성을 유지하면서 대여받는 동안 원본 데이터는 변경 가능하게 대여받을 수 없습니다. 반대로, 변경 가능한 대여는 한 번에 한 개만 허용됩니다. 원본 데이터는 변경 가능한 참조가 마지막으로 사용된 후에 다시 대여받을 수 있습니다.

```rust,editable
struct Point { x: i32, y: i32, z: i32 }

fn main() {
    let mut point = Point { x: 0, y: 0, z: 0 };

    let borrowed_point = &point;
    let another_borrow = &point;

    // 참조와 원본 소유자를 통해 데이터에 액세스할 수 있습니다.
    println!("Point has coordinates: ({}, {}, {})",
                borrowed_point.x, another_borrow.y, point.z);

    // 오류! 현재 무결성을 유지하는 대여를 받았기 때문에 `point`를 변경 가능하게 대여받을 수 없습니다.
    // let mutable_borrow = &mut point;
    // TODO ^ 해당 줄을 풀어보세요

    // 대여된 값이 여기서 다시 사용됩니다.
    println!("Point has coordinates: ({}, {}, {})",
                borrowed_point.x, another_borrow.y, point.z);

    // 무결성 참조는 이제 코드의 나머지 부분에서 사용되지 않으므로 변경 가능한 참조로 다시 대여받을 수 있습니다.
    let mutable_borrow = &mut point;

    // 변경 가능한 참조를 통해 데이터 변경
    mutable_borrow.x = 5;
    mutable_borrow.y = 2;
    mutable_borrow.z = 1;

    // 오류! 현재 변경 가능하게 대여받았기 때문에 `point`를 무결성으로 대여받을 수 없습니다.
    // let y = &point.y;
    // TODO ^ 해당 줄을 풀어보세요

    // 오류! `println!`은 무결성 참조를 받기 때문에 출력할 수 없습니다.
    // println!("Point Z coordinate is {}", point.z);
    // TODO ^ 해당 줄을 풀어보세요

    // 괜찮습니다! 변경 가능한 참조를 `println!`에 무결성으로 전달할 수 있습니다.
    println!("Point has coordinates: ({}, {}, {})",
                mutable_borrow.x, mutable_borrow.y, mutable_borrow.z);

    // 변경 가능한 참조는 이제 코드의 나머지 부분에서 사용되지 않으므로 다시 대여받을 수 있습니다.
    let new_borrowed_point = &point;
    println!("Point now has coordinates: ({}, {}, {})",
             new_borrowed_point.x, new_borrowed_point.y, new_borrowed_point.z);
}
```
