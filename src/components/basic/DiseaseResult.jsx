import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle, Leaf } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DiseaseResult({ isOpen, onClose, diseases }) {

    const uniqueDiseases = diseases.filter((disease) => !disease.redundant)

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex h-full max-h-[90vh] flex-col overflow-hidden" onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Leaf className="h-5 w-5" />
                        Detection Results
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="pr-4 h-full pb-8">
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
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

