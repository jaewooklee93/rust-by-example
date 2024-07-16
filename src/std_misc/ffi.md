##  외부 함수 인터페이스

Rust는 C 라이브러리에 대한 외부 함수 인터페이스(FFI)를 제공합니다. 외부 함수는 `extern` 블록 안에서 선언되어야 하며 `#[link]` 속성을 사용하여 외부 라이브러리의 이름을 지정해야 합니다.

```rust,ignore
use std::fmt;

// 이 extern 블록은 libm 라이브러리에 연결됩니다
#[cfg(target_family = "windows")]
#[link(name = "msvcrt")]
extern {
    // 이것은 외부 함수입니다.
    // 단일 정밀도 복소수의 제곱근을 계산합니다.
    fn csqrtf(z: Complex) -> Complex;

    fn ccosf(z: Complex) -> Complex;
}
#[cfg(target_family = "unix")]
#[link(name = "m")]
extern {
    // 이것은 외부 함수입니다.
    // 단일 정밀도 복소수의 제곱근을 계산합니다.
    fn csqrtf(z: Complex) -> Complex;

    fn ccosf(z: Complex) -> Complex;
}

// 외부 함수를 호출하는 것은 안전하지 않다고 간주되므로,
// 일반적으로 안전한 래퍼를 사용하여 외부 함수를 감싸는 것이 좋습니다.
fn cos(z: Complex) -> Complex {
    unsafe { ccosf(z) }
}

fn main() {
    // z = -1 + 0i
    let z = Complex { re: -1., im: 0. };

    // 외부 함수를 호출하는 것은 안전하지 않은 작업입니다.
    let z_sqrt = unsafe { csqrtf(z) };

    println!("the square root of {:?} is {:?}", z, z_sqrt);

    // 안전한 API를 사용하여 안전하지 않은 작업을 감싼 호출
    println!("cos({:?}) = {:?}", z, cos(z));
}

// 단일 정밀도 복소수의 최소 구현
#[repr(C)]
#[derive(Clone, Copy)]
struct Complex {
    re: f32,
    im: f32,
}

impl fmt::Debug for Complex {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        if self.im < 0. {
            write!(f, "{}-{}i", self.re, -self.im)
        } else {
            write!(f, "{}+{}i", self.re, self.im)
        }
    }
}
```
