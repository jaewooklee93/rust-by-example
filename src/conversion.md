## 변환

원시 유형은 [형변환]을 통해 서로 변환될 수 있습니다.

Rust는 사용자 정의 유형(즉, `struct` 및 `enum`) 간 변환을 [trait]를 사용하여 처리합니다.
일반적인 변환은 [`From`] 및 [`Into`] trait를 사용합니다. 그러나 `String`으로 변환하는 경우와 같이 더 일반적인 경우에 더 구체적인 변환이 있습니다.

[형변환]: types/cast.md
[trait]: trait.md
[`From`]: https://doc.rust-lang.org/std/convert/trait.From.html
[`Into`]: https://doc.rust-lang.org/std/convert/trait.Into.html
