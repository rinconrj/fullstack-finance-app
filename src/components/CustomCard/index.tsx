import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";

export default function CustomCard({ title, value }: { title: string, value: number }) {
  return (
    <Card className="mt-6 w-48">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {value}
        </Typography>
      </CardBody>
    </Card>
  );
}