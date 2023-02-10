const editor = new EditorJS({
    tools: {
        header: {
            class: Header,
            inlineToolbar: ["link"],
            config: {
                placeholder: "Enter a header",
                levels: [1, 2, 3, 4, 5, 6],
                defaultLevel: 1,
            },
        },
        list: {
            class: List,
            inlineToolbar: ["link", "bold"],
            config: {
                defaultStyle: "unordered",
            },
        },
        embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
                services: {
                    youtube: true,
                },
            },
        },
        code: CodeTool,
        image: {
            class: ImageTool,
            config: {
                endpoints: {
                    byFile: "http://localhost:3000/uploadFile", // Your backend file uploader endpoint
                    byUrl: "http://localhost:3000/fetchUrl", // Your endpoint that provides uploading by Url
                },
                field: "avatar",
                type: "image/*",
            },
        },
        quote: {
            class: Quote,
            config: {
                quotePlaceholder: "Enter a quote",
                captionPlaceholder: "Quote's author",
            },
        },
    },
});

const savbtn = document.querySelector("button");

savbtn.addEventListener("click", function () {
    editor
        .save()
        .then(async ({ blocks }) => {
            // console.log(blocks);
            let blog = "";
            blocks.forEach((element) => {
                // console.log(element);

                if (element.type === "paragraph") {
                    blog += "<p>" + element.data.text + "</p>";
                }
                if (element.type === "header") {
                    blog +=
                        "<h" +
                        element.data.level +
                        ">" +
                        element.data.text +
                        "</h" +
                        element.data.level +
                        ">";
                }
                if (element.type === "list") {
                    blog +=
                        "<" +
                        element.data.style[0] +
                        element.type[0] +
                        "/>" +
                        element.data.items
                            .map((i) => "<li>" + i + "</li>")
                            .join("") +
                        "<" +
                        element.data.style[0] +
                        element.type[0] +
                        "/>";
                }
                if (element.type === "code") {
                    blog +=
                        "<" +
                        element.type +
                        ">" +
                        element.data.code +
                        "</" +
                        element.type +
                        ">";
                }
                if (element.type === "quote") {
                    blog +=
                        "<" +
                        element.type[0] +
                        ">" +
                        element.data.text +
                        "</" +
                        element.type[0] +
                        ">";
                }
                if (element.type === "image") {
                    blog +=
                        "<img src=" +
                        element.data.file.url +
                        " /><figcaption>" +
                        element.data.caption +
                        "</figcaption>";
                }
            });
            const { data } = await axios.post("http://localhost:3000/write", {
                blog,
            });
            window.location.href = "http://localhost:3000/";
        })
        .catch((err) => console.log(err));
});
