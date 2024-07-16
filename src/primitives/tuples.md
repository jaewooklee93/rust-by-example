## 튜플

튜플은 다양한 유형의 값을 모아놓은 자료구조입니다. 튜플은 괄호 `()`를 사용하여 생성되며, 각 튜플 자체는 유형 표시 `(T1, T2, ...)`를 가진 값입니다. 함수는 여러 값을 반환하기 위해 튜플을 사용할 수 있으며, 튜플은 임의의 수의 값을 저장할 수 있습니다.

```rust,editable
// 튜플은 함수 인수 및 반환 값으로 사용될 수 있습니다.
fn reverse(pair: (i32, bool)) -> (bool, i32) {
    // `let`을 사용하여 튜플의 구성 요소를 변수에 바인딩할 수 있습니다.
    let (int_param, bool_param) = pair;

    (bool_param, int_param)
}

// 다음 구조체는 활동을 위한 것입니다.
#[derive(Debug)]
struct Matrix(f32, f32, f32, f32);

fn main() {
    // 다양한 유형을 가진 튜플.
    let long_tuple = (1u8, 2u16, 3u32, 4u64,
                      -1i8, -2i16, -3i32, -4i64,
                      0.1f32, 0.2f64,
                      'a', true);

    // 튜플에서 값을 추출하려면 튜플 인덱싱을 사용할 수 있습니다.
    println!("Long tuple first value: {}", long_tuple.0);
    println!("Long tuple second value: {}", long_tuple.1);

    // 튜플은 튜플 구성 요소일 수 있습니다.
    let tuple_of_tuples = ((1u8, 2u16, 2u32), (4u64, -1i8), -2i16);

    // 튜플은 출력 가능합니다.
    println!("tuple of tuples: {:?}", tuple_of_tuples);

    // 하지만 12개 이상의 요소를 가진 긴 튜플은 출력할 수 없습니다.
    //let too_long_tuple = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
    //println!("Too long tuple: {:?}", too_long_tuple);
    // TODO ^ 위 2줄을 해제하여 컴파일러 오류를 확인하세요

    let pair = (1, true);
    println!("Pair is {:?}", pair);

    println!("The reversed pair is {:?}", reverse(pair));

    // 하나의 요소 튜플을 만들려면 쉼표가 필요합니다. 괄호로 둘러싸인 문자열과 구분하기 위해 쉼표가 필요합니다.
    println!("One element tuple: {:?}", (5u32,));
    println!("Just an integer: {:?}", (5u32));

    // 튜플을 해체하여 바인딩을 생성할 수 있습니다.
    let tuple = (1, "hello", 4.5, true);

    let (a, b, c, d) = tuple;
    println!("{:?}, {:?}, {:?}, {:?}", a, b, c, d);

    let matrix = Matrix(1.1, 1.2, 2.1, 2.2);
    println!("{:?}", matrix);
}
```

### 활동

1. *복습*: 위 예제의 `Matrix` 구조체에 `fmt::Display` 트레이트를 추가하여, `{:?}` 디버그 형식에서 `{}` 디스플레이 형식으로 출력을 전환하면 다음과 같은 출력을 얻을 수 있습니다.

   ```text
   ( 1.1 1.2 )
   ( 2.1 2.2 )
   ```

   `[print_display]` 예제를 참조할 수 있습니다.
2. `reverse` 함수를 템플릿으로 사용하여 `transpose` 함수를 추가합니다. 이 함수는 튜플을 인수로 받고, 두 요소를 교환하여 반환합니다. 예를 들어:

   ```rust,ignore
   println!("Matrix:\n{}", matrix);
   println!("Transpose:\n{}", transpose(matrix));
   ```

   다음과 같은 출력을 생성합니다.

   ```text
   Matrix:
   ( 1.1 1.2 )
   ( 2.1 2.2 )
   Transpose:
   ( 1.1 2.1 )
   ( 1.2 2.2 )
   ```

[print_display]: ../hello/print/print_display.md
