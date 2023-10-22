import {Card, CardHeader, CardBody, CardFooter, Button} from "@material-tailwind/react";

const Multiple = () => {
    return (
        <>
            <main className="w-full min-h-screen flex items-center justify-center">
                <section className="w-[95%] min-h-screen my-5 flex flex-wrap gap-x-5 gap-y-12">
                    <section className="w-[250px] h-[350px] border rounded-md">
                        <Card className="h-full">
                            <CardHeader color="blue-gray" className="h-56">
                                <img src="" alt="" />
                            </CardHeader>
                            <CardBody>
                                <p>Test Text</p>
                            </CardBody>
                            <CardFooter>
                                <Button>Learn More</Button>
                            </CardFooter>
                        </Card>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Multiple;