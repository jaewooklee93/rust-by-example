## 리터럴 및 연산자

정수 `1`, 부동 소수점 `1.2`, 문자 `'a'`, 문자열 `"abc"`, 불린 값 `true` 및 단위 유형 `()`는 리터럴을 사용하여 표현할 수 있습니다.

정수는 16진수, 8진수 또는 2진수 표기법을 사용하여 `0x`, `0o` 또는 `0b` 접두사를 사용하여 대체로 표현할 수 있습니다.

숫자 리터럴에 밑줄을 삽입하여 읽기 쉽게 만들 수 있습니다. 예를 들어 `1_000`은 `1000`과 동일하며, `0.000_001`은 `0.000001`과 동일합니다.

Rust는 과학적 [E 표기법][enote]을 지원합니다. 예를 들어 `1e6`, `7.6e-4`와 같습니다. 관련 유형은 `f64`입니다.

우리는 사용하는 리터럴의 유형을 컴파일러에게 알려야 합니다. 현재 `u32` 접미사를 사용하여 리터럴이 32비트 무符号 정수이며, `i32` 접미사를 사용하여 32비트 정수임을 나타냅니다.

사용 가능한 연산자와 우선순위 [Rust][rust op-prec]는 다른 [C-식 언어][op-prec]와 유사합니다.

```rust,editable
fn main() {
    // 정수 덧셈
    println!("1 + 2 = {}", 1u32 + 2);

    // 정수 뺄셈
    println!("1 - 2 = {}", 1i32 - 2);
    // TODO ^ `1i32`을 `1u32`로 변경하여 유형이 중요한 이유를 확인해 보세요

    // 과학적 표기법
    println!("1e4 is {}, -2.5e-3 is {}", 1e4, -2.5e-3);

    // 단축 논리 불린 연산
    println!("true AND false is {}", true && false);
    println!("true OR false is {}", true || false);
    println!("NOT true is {}", !true);

    // 비트 연산
    println!("0011 AND 0101 is {:04b}", 0b0011u32 & 0b0101);
    println!("0011 OR 0101 is {:04b}", 0b0011u32 | 0b0101);
    println!("0011 XOR 0101 is {:04b}", 0b0011u32 ^ 0b0101);
    println!("1 << 5 is {}", 1u32 << 5);
    println!("0x80 >> 2 is 0x{:x}", 0x80u32 >> 2);

    // 밑줄을 사용하여 읽기 쉽게 만들어 보세요!
    println!("One million is written as {}", 1_000_000u32);
}
```

[enote]: https://ko.wikipedia.org/wiki/과학적_표기법#E_표기법
[rust op-prec]: https://doc.rust-lang.org/reference/expressions.html#expression-precedence
[op-prec]: https://ko.wikipedia.org/wiki/연산자_우선순위#프로그래밍_언어
