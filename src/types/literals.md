## 리터럴

숫자 리터럴은 유형을 추가하여 지정할 수 있습니다. 예를 들어, 리터럴 `42`가 유형 `i32`를 가져야 한다면 `42i32`와 같이 작성합니다.

접두사가 없는 숫자 리터럴의 유형은 사용되는 방식에 따라 달라집니다. 제약이 없으면 컴파일러는 정수에 대해 `i32`를, 부동 소수점 수에 대해 `f64`를 사용합니다.

```rust,editable
fn main() {
    // 접두사가 있는 리터럴, 초기화 시 유형이 알려져 있습니다
    let x = 1u8;
    let y = 2u32;
    let z = 3f32;

    // 접두사가 없는 리터럴, 사용되는 방식에 따라 유형이 달라집니다
    let i = 1;
    let f = 1.0;

    // `size_of_val`는 변수의 크기를 바이트 단위로 반환합니다
    println!("size of `x` in bytes: {}", std::mem::size_of_val(&x));
    println!("size of `y` in bytes: {}", std::mem::size_of_val(&y));
    println!("size of `z` in bytes: {}", std::mem::size_of_val(&z));
    println!("size of `i` in bytes: {}", std::mem::size_of_val(&i));
    println!("size of `f` in bytes: {}", std::mem::size_of_val(&f));
}
```

이전 코드에서 사용된 몇 가지 개념은 아직 설명되지 않았습니다. 호기심 많은 독자를 위해 간략한 설명을 제공합니다.

* `std::mem::size_of_val`은 함수이지만 *전체 경로*로 호출됩니다. 코드는 논리적 단위인 *모듈*로 나눌 수 있습니다. 이 경우 `size_of_val` 함수는 `mem` 모듈에서 정의되며, `mem` 모듈은 `std` *crate*에서 정의됩니다. 자세한 내용은 [모듈][mod]과 [crate][crate]을 참조하십시오.

[mod]: ../mod.md
[crate]: ../crates.md
