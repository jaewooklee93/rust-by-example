## 형변환

Rust는 기본형 유형 간에 암시적 형변환(coercion)을 제공하지 않습니다.
하지만, `as` 키워드를 사용하여 명시적 형변환(casting)을 수행할 수 있습니다.

정수 유형 간 형변환 규칙은 일반적으로 C의 규칙을 따르지만, C에서 정의되지 않은 동작이 있는 경우가 있습니다. Rust에서 모든 형변환의 동작은 명확하게 정의되어 있습니다.

```rust,editable,ignore,mdbook-runnable
// 모든 형변환으로 인한 오류를 무시합니다.
#![allow(overflowing_literals)]

fn main() {
    let decimal = 65.4321_f32;

    // 오류! 암시적 형변환이 없습니다
    let integer: u8 = decimal;
    // FIXME ^ 이 줄을 주석 처리하세요

    // 명시적 형변환
    let integer = decimal as u8;
    let character = integer as char;

    // 오류! 형변환 규칙에 제한이 있습니다.
    // 부동 소수점을 직접 문자로 변환할 수 없습니다.
    let character = decimal as char;
    // FIXME ^ 이 줄을 주석 처리하세요

    println!("Casting: {} -> {} -> {}", decimal, integer, character);

    // 어떤 값을 무符号 유형 T로 형변환할 때,
    // T::MAX + 1이 더하거나 빼서 값이
    // 새 유형에 맞게 변환됩니다

    // 1000은 이미 u16에 들어갑니다
    println!("1000 as a u16 is: {}", 1000 as u16);

    // 1000 - 256 - 256 - 256 = 232
    // 맨 뒤에서부터 가장 중요한 비트(MSB)까지 잘라내고,
    // 앞 8비트(LSB)만 유지됩니다.
    println!("1000 as a u8 is : {}", 1000 as u8);
    // -1 + 256 = 255
    println!("  -1 as a u8 is : {}", (-1i8) as u8);

    // 긍정적인 숫자의 경우, 이것은 modulus 연산과 동일합니다.
    println!("1000 mod 256 is : {}", 1000 % 256);

    // 유형으로 형변환할 때, (비트 연산) 결과는
    // 먼저 해당하는 무符号 유형으로 형변환한 것과 동일합니다. 해당 값의 가장 중요한 비트가 1이면 값이 음수입니다.

    // 이미 들어가는 경우를 제외하고는
    println!(" 128 as a i16 is: {}", 128 as i16);

    // 경계 조건에서 128 값은 8비트 두의 보수 표현에서 -128입니다
    println!(" 128 as a i8 is : {}", 128 as i8);

    // 위의 예시를 반복
    // 1000 as u8 -> 232
    println!("1000 as a u8 is : {}", 1000 as u8);
    // 그리고 232 값은 8비트 두의 보수 표현에서 -24입니다
    println!(" 232 as a i8 is : {}", 232 as i8);

    // Rust 1.45부터 `as` 키워드는 부동 소수점을 정수로 형변환할 때 *포화 형변환*을 수행합니다.
    // 부동 소수점 값이 상한 값을 초과하거나 하한 값보다 작으면, 반환되는 값은 넘어간 경계 값이 됩니다.

    // 300.0 as u8은 255입니다
    println!(" 300.0 as u8 is : {}", 300.0_f32 as u8);
    // -100.0 as u8은 0입니다
    println!("-100.0 as u8 is : {}", -100.0_f32 as u8);
    // nan as u8은 0입니다
    println!("   nan as u8 is : {}", f32::NAN as u8);

    // 이러한 동작은 작은 실행 시간 비용을 발생시키며, `unsafe` 메서드를 사용하여 피할 수 있습니다. 그러나 결과는 오버플로우를 일으켜
    // **잘못된 값**을 반환할 수 있습니다. 이러한 메서드를 신중하게 사용하십시오:
    unsafe {
        // 300.0 as u8은 44입니다
        println!(" 300.0 as u8 is : {}", 300.0_f32.to_int_unchecked::<u8>());
        // -100.0 as u8은 156입니다
```rust
fn main() {
    println!("100 as u8 is : {}", 100 as u8);
    println!("100.0 as u8 is : {}", 100.0_f32.to_int_unchecked::<u8>());
    println!("-100.0 as u8 is : {}", (-100.0_f32).to_int_unchecked::<u8>());
    // nan as u8 is 0
    println!("   nan as u8 is : {}", f32::NAN.to_int_unchecked::<u8>());
}
```
