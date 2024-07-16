## 개발 의존성

때때로 테스트 (또는 예제 또는 벤치마크)에만 필요한 의존성이 있습니다. 이러한 의존성은 `Cargo.toml`의 `[dev-dependencies]` 섹션에 추가됩니다. 이러한 의존성은이 패키지에 의존하는 다른 패키지로 전파되지 않습니다.

예를 들어 [`pretty_assertions`](https://docs.rs/pretty_assertions/1.0.0/pretty_assertions/index.html)는 표준 `assert_eq!` 및 `assert_ne!` 매크로를 확장하여 색상이 있는 diff를 제공하는 것입니다. 
`Cargo.toml` 파일:

```toml
# 기본 크레이트 데이터는 생략됩니다
[dev-dependencies]
pretty_assertions = "1"
```

`src/lib.rs` 파일:

```rust,ignore
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;
    use pretty_assertions::assert_eq; // 테스트 전용 사용 크레이트. 테스트 코드 이외의 코드에서 사용할 수 없습니다.

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}
```

## 참조
[Cargo][cargo] 의존성 지정에 대한 설명.

[cargo]: http://doc.crates.io/specifying-dependencies.html
