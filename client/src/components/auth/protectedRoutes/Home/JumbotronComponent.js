import React, { Fragment, useContext } from "react";
import { UserProfileContext } from "./UserProfileContext";
import { Jumbotron } from "reactstrap";

const JumbotronComponent = () => {
    const [userInfo] = useContext(UserProfileContext);
    return (
        <Fragment>
            {userInfo.map(list => {
                const { _id, name } = list;
                const trimName = name.trim();
                const SplitTrimName = trimName.split(" ");
                const initTrimName = SplitTrimName[0];
                return (
                    <div key={_id}>
                        <Jumbotron
                            style={{
                                backgroundColor: "black",
                                padding: "10px 5px 0px 20px"
                            }}
                        >
                            <h1 className="display-3">Hello, {initTrimName}</h1>
                            <p className="lead">
                                Here's how you can use this website :
                                <br />
                                For Example, if you visit Facebook too often or
                                you want to save an article read in
                                Medium(tech), select the right category from our
                                Social, Movies, Sports, Music and Others
                                category, after that just copy your website's
                                link under linkName category and give a suitable
                                name/heading for the link under link category.
                                After this you can easily access all the links
                                quickly and easily from here.
                                <br />
                                <br />
                                Scope of this website :
                                <br />
                                Since I personally find this website quite
                                useful therefore I will surely keep adding more
                                and more features to it. I love dark mode and
                                hence I have started with it only. Surely I will
                                add light mode as well which my next priority.
                                Apart from it, I have thought of adding some
                                other intersting features to it in the next
                                update.
                                <b>This is just the beginning!</b>
                            </p>
                        </Jumbotron>
                    </div>
                );
            })}
        </Fragment>
    );
};

export default JumbotronComponent;
