

class CustomLogging {

    body: {
        title: string;
        color: string,
        size: string,
        background: string
    }

    constructor(title : string | null) {
        this.body = {
            title: title || "---",
            color: "#d7ccc8",
            size: "12px",
            background: "#b71c1c"
        };
    }
    setBodyStyle(color: string | null = null, size: string | null = null, background: string | null = null) {

        if (color !== null) this.body.color = color;
        if (size !== null) this.body.size = size;
        if (background !== null) this.body.background = background;
    }

    log(body : object | any = "") {
        // adds dynamic styling via the template literals
        setTimeout(() => {
            console.error(
                ` %c${this.body.title} %o`,
                `color: ${this.body.color}; font-weight: bold; font-size: ${this.body.size}; 
                padding: 0px 0px 0px 5px; margin-right: 5px; border-radius: 10%; background-color: ${this.body.background}; box-shadow: 0px 0px 3px black;`,
                body
    
            );
        }, 10);
    }
}
export default CustomLogging;