import React from 'react'

const NB_ELEMENT = 5

const Page = (size) => {
    let arr = []

    for (let i = 0; i < size / NB_ELEMENT; i++) {
        arr.push(i + 1)
    }

    return arr
}

const Words = (props) => (
    <ul className="list-group">
        <li className="list-group-item">
            <button type="button" className="btn btn-primary">
                <i className="fa fa-plus" aria-hidden="true"></i> Add word
            </button>
        </li>

        {props.words.slice(props.page * NB_ELEMENT, NB_ELEMENT * (props.page + 1)).map((word) =>
            <li key={word.id} className="list-group-item">
                {word.en}
                <button type="button" onClick={() => props.push("/edit/word/" + word.id)} className="btn btn-primary margin-lft-5 margin-btm-5">
                    <i className="fa fa-wrench" aria-hidden="true"></i> Edit
                </button>
            </li>
        )}

        <li className="list-group-item">
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li>
                        <a href="#" onClick={(e) => {
                            e.preventDefault()
                            if (props.page > 0) props.updatePage(props.page - 1)
                        }} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    {Page(props.words.length).map(i => (
                        <li key={i} className={i === props.page + 1 ? "active" : ""}>
                            <a href="#" onClick={e => {
                                e.preventDefault()
                                props.updatePage(i - 1)
                            }}>{i}</a>
                        </li>
                    ))}

                    <li>
                        <a href="#" onClick={(e) => {
                            e.preventDefault()
                            if (props.page < props.words.length / NB_ELEMENT) props.updatePage(props.page + 1)
                        }} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </li>
    </ul>
)

export default Words
