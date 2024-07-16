## DRY (반복을 피하세요)

메이커는 함수 및/또는 테스트 스위트의 공통 부분을 추출하여 DRY 코드를 작성하는 데 사용할 수 있습니다. 다음은 `Vec<T>`에 `+=`, `*=` 및 `-=` 연산자를 구현하고 테스트하는 예입니다.

```rust,editable
use std::ops::{Add, Mul, Sub};

macro_rules! assert_equal_len {
    // `tt` (토큰 트리) 지정자는 연산자 및 토큰에 사용됩니다.
    ($a:expr, $b:expr, $func:ident, $op:tt) => {
        assert!($a.len() == $b.len(),
                "{:?}: 차원 일치 오류: {:?} {:?} {:?}",
                stringify!($func),
                ($a.len(),),
                stringify!($op),
                ($b.len(),));
    };
}

macro_rules! op {
    ($func:ident, $bound:ident, $op:tt, $method:ident) => {
        fn $func<T: $bound<T, Output=T> + Copy>(xs: &mut Vec<T>, ys: &Vec<T>) {
            assert_equal_len!(xs, ys, $func, $op);

            for (x, y) in xs.iter_mut().zip(ys.iter()) {
                *x = $bound::$method(*x, *y);
                // *x = x.$method(*y);
            }
        }
    };
}

// `add_assign`, `mul_assign`, `sub_assign` 함수를 구현합니다.
op!(add_assign, Add, +=, add);
op!(mul_assign, Mul, *=, mul);
op!(sub_assign, Sub, -=, sub);

mod test {
    use std::iter;
    macro_rules! test {
        ($func:ident, $x:expr, $y:expr, $z:expr) => {
            #[test]
            fn $func() {
                for size in 0usize..10 {
                    let mut x: Vec<_> = iter::repeat($x).take(size).collect();
                    let y: Vec<_> = iter::repeat($y).take(size).collect();
                    let z: Vec<_> = iter::repeat($z).take(size).collect();

                    super::$func(&mut x, &y);

                    assert_eq!(x, z);
                }
            }
        };
    }

    // `add_assign`, `mul_assign`, `sub_assign` 테스트.
    test!(add_assign, 1u32, 2u32, 3u32);
    test!(mul_assign, 2u32, 3u32, 6u32);
    test!(sub_assign, 3u32, 2u32, 1u32);
}
```

```shell
$ rustc --test dry.rs && ./dry
running 3 tests
test test::mul_assign ... ok
test test::add_assign ... ok
test test::sub_assign ... ok

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured
```
