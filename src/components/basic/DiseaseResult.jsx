import { AlertTriangle, Leaf, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DiseaseResult({ diseases, onClose }) {

    const uniqueDiseases = diseases.filter((disease) => !disease.redundant)

    return (
        <Card id="results">
            <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Detection Results
                </CardTitle>
                <Button variant="ghost" size="icon" className="absolute right-3 sm:-top-3 -top-2" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[335px] resultContScroll">
                <div className="space-y-6">
                    {uniqueDiseases.map((disease) => (
                        <div key={disease.id} className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">{disease.name}</h3>
                                    <Badge variant={disease.probability > 0.9 ? "destructive" : "secondary"}>
                                        {Math.round(disease.probability * 100)}% Confidence
                                    </Badge>
                                </div>
                                <Progress value={disease.probability * 100} className="h-2" />
                            </div>

                            <p className="text-sm text-muted-foreground">{disease.details.description}</p>

                            {disease.probability > 0.9 && (
                                <Alert>
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>High Confidence Detection</AlertTitle>
                                    <AlertDescription>
                                        This disease has been detected with high confidence. Immediate action is recommended.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="chemical">
                                    <AccordionTrigger>Chemical Treatment</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="ml-4 space-y-2 list-disc">
                                            {disease.details.treatment.chemical.map((treatment, index) => (
                                                <li key={index} className="text-sm">
                                                    {treatment}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="biological">
                                    <AccordionTrigger>Biological Treatment</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="ml-4 space-y-2 list-disc">
                                            {disease.details.treatment.biological.map((treatment, index) => (
                                                <li key={index} className="text-sm">
                                                    {treatment}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="prevention">
                                    <AccordionTrigger>Prevention Methods</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="ml-4 space-y-2 list-disc">
                                            {disease.details.treatment.prevention.map((treatment, index) => (
                                                <li key={index} className="text-sm">
                                                    {treatment}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            {disease.details.cause && (
                                <div className="text-sm">
                                    <span className="font-medium">Cause: </span>
                                    {disease.details.cause}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

