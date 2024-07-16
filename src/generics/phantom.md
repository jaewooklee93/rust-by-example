## 가상 타입 매개변수

가상 타입 매개변수는 런타임에 나타나지 않지만,
컴파일 시에만 정적으로 검사됩니다.

데이터 유형은 컴파일 시에 마커로서 또는 유형 검사를 수행하기 위해 추가적인 일반 타입 매개변수를 사용할 수 있습니다. 이러한 추가 매개변수는 저장 값을 가지지 않으며,
런타임에 동작하지 않습니다.

다음 예제에서는 [std::marker::PhantomData]
을 가상 타입 매개변수 개념과 함께 사용하여 다양한 데이터 유형을 포함하는 튜플을 만듭니다.

```rust,editable
use std::marker::PhantomData;

// `A`에 대한 가상 튜플 구조체로, 숨겨진 매개변수 `B`를 가집니다.
#[derive(PartialEq)] // 이 유형에 대해 등식 테스트를 허용합니다.
struct PhantomTuple<A, B>(A, PhantomData<B>);

// `A`에 대한 가상 유형 구조체로, 숨겨진 매개변수 `B`를 가집니다.
#[derive(PartialEq)] // 이 유형에 대해 등식 테스트를 허용합니다.
struct PhantomStruct<A, B> { first: A, phantom: PhantomData<B> }

// 주의: 일반 타입 `A`에 대해 저장 공간이 할당되지만, `B`에 대해서는 할당되지 않습니다.
//       따라서 `B`는 계산에서 사용할 수 없습니다.

fn main() {
    // 여기서 `f32`와 `f64`는 숨겨진 매개변수입니다.
    // PhantomTuple 유형이 `<char, f32>`로 지정되었습니다.
    let _tuple1: PhantomTuple<char, f32> = PhantomTuple('Q', PhantomData);
    // PhantomTuple 유형이 `<char, f64>`로 지정되었습니다.
    let _tuple2: PhantomTuple<char, f64> = PhantomTuple('Q', PhantomData);

    // 유형이 `<char, f32>`로 지정되었습니다.
    let _struct1: PhantomStruct<char, f32> = PhantomStruct {
        first: 'Q',
        phantom: PhantomData,
    };
    // 유형이 `<char, f64>`로 지정되었습니다.
    let _struct2: PhantomStruct<char, f64> = PhantomStruct {
        first: 'Q',
        phantom: PhantomData,
    };

    // 컴파일 시 오류! 유형 불일치이므로 이것들을 비교할 수 없습니다:
    // println!("_tuple1 == _tuple2 yields: {}",
    //           _tuple1 == _tuple2);

    // 컴파일 시 오류! 유형 불일치이므로 이것들을 비교할 수 없습니다:
    // println!("_struct1 == _struct2 yields: {}",
    //           _struct1 == _struct2);
}
```

### 참조:

[Derive], [struct], and [TupleStructs]

[Derive]: ../trait/derive.md
[struct]: ../custom_types/structs.md
[TupleStructs]: ../custom_types/structs.md
[std::marker::PhantomData]: https://doc.rust-lang.org/std/marker/struct.PhantomData.html
