## 안전하지 않은 작업

이 섹션의 소개로서, [공식 문서][unsafe]에서 가져온 내용을 참고하여,"코드베이스에서 안전하지 않은 코드의 양을 최소화해야 합니다." 이 점을 염두에 두고 시작해 보겠습니다!
Rust에서 안전하지 않은 표시는 컴파일러가 설정한 보호를 우회하기 위해 사용됩니다. 구체적으로, 안전하지 않은 작업은 네 가지 주요 용도로 사용됩니다.

* 날짜 포인터 해제
* `unsafe` 함수 또는 메서드를 호출하는 것(FFI를 통한 함수 호출을 포함합니다. [이전 챕터](std_misc/ffi.md)를 참조하세요)
* 정적 변수에 접근하거나 수정하는 것
* 안전하지 않은 트레이트를 구현하는 것

### 날짜 포인터
날짜 포인터 `*`와 참조 `&T`는 유사하게 작동하지만, 참조는 항상 보로 체커 덕분에 유효한 데이터를 가리키는 것이 보장되어 안전합니다. 날짜 포인터를 해제하려면 안전하지 않은 블록을 통해만 수행할 수 있습니다.

```rust,editable
fn main() {
    let raw_p: *const u32 = &10;

    unsafe {
        assert!(*raw_p == 10);
    }
}
```

### 안전하지 않은 함수 호출
일부 함수는 `unsafe`로 선언될 수 있으며, 이는 컴파일러가 아니라 프로그래머의 책임이라고 합니다. 예를 들어 [`std::slice::from_raw_parts`]는 포인터를 첫 번째 요소와 길이를 제공하여 슬라이스를 생성합니다.

```rust,editable
use std::slice;

fn main() {
    let some_vector = vec![1, 2, 3, 4];

    let pointer = some_vector.as_ptr();
    let length = some_vector.len();

    unsafe {
        let my_slice: &[u32] = slice::from_raw_parts(pointer, length);

        assert_eq!(some_vector.as_slice(), my_slice);
    }
}
```

`slice::from_raw_parts`의 경우, *반드시* 유지되어야 하는 가정 중 하나는 전달된 포인터가 유효한 메모리를 가리키고, 가리키는 메모리가 올바른 유형임을 의미합니다. 이러한 불변성이 유지되지 않으면 프로그램의 동작이 정의되지 않으며 무슨 일이 일어날지 알 수 없습니다.


[unsafe]: https://doc.rust-lang.org/book/ch19-01-unsafe-rust.html
[`std::slice::from_raw_parts`]: https://doc.rust-lang.org/std/slice/fn.from_raw_parts.html
