import React from "react";
import ReactLoading from "react-loading";
// import { Section, Title, Article, Prop, list } from "./generic";

const Loading = () => {
    // <Section>
    // <Title>React Loading</Title>
    {/* {list.map(l => (
            <Article key={l.prop}>
                <ReactLoading type={l.prop} color="#fff" />
                <Prop>{l.name}</Prop>
            </Article>
        ))} */}
    return (
        <div>
            <ReactLoading type="spokes" color="#0000FF"
                height={100} width={50} />
        </div>
    )

    // </Section>
};

export default Loading;
