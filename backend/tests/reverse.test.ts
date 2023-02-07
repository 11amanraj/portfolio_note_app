import tests from '../utils/for_testing'

test('reverse of a', () => {
    const result = tests.reverse('a')

    expect(result).toBe('a')
})

test('reverse of react', () => {
    const result = tests.reverse('react')

    expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
    const result = tests.reverse('releveler')

    expect(result).toBe('releveler')
})