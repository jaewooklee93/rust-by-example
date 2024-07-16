## 변경 가능성

소유권이 전달될 때 데이터의 변경 가능성이 변경될 수 있습니다.

```rust,editable
fn main() {
    let immutable_box = Box::new(5u32);

    println!("immutable_box contains {}", immutable_box);

    // 변경 가능성 오류
    //*immutable_box = 4;

    // *이동*하여 소유권을 변경하고 (변경 가능성도 변경)
    let mut mutable_box = immutable_box;

    println!("mutable_box contains {}", mutable_box);

    // 상자의 내용을 수정
    *mutable_box = 4;

    println!("mutable_box now contains {}", mutable_box);
}
```
