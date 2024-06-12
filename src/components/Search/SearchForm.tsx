import styles from './Search.module.scss'

import { type FormEventHandler, type MouseEventHandler } from 'react'
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";

interface PropsType {
    onSearch: MouseEventHandler<HTMLButtonElement>;
    onReset: MouseEventHandler<HTMLButtonElement>;
    action: FormEventHandler<HTMLFormElement>
    inputOptions: {
        defaultValue?: string
        placeholder: string
        id: string
        type: string
        name: string

    }
    buttonOptions: {
        text: string
        type: "submit" | "reset" | "button"
    }
    resetButtonOptions: {
        text: string
        type: "submit" | "reset" | "button"
    }
}

export default function SearchForm({ action, onSearch, onReset, inputOptions, buttonOptions, resetButtonOptions }: PropsType) {
    return (
        <form className={styles.search_container} onSubmit={action}>
            <h2 className={styles.search_form_title}>검색</h2>
            <SearchInput
                inputOptions={inputOptions}
            />

            {/* 조회 버튼 */}
            <SearchButton onClick={onSearch} options={buttonOptions} />
            {/* 리셋 버튼 */}
            <SearchButton onClick={onReset} options={resetButtonOptions} />
        </form>
    )
}