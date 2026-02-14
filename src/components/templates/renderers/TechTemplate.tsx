import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { CV } from "@/types/cv";

Font.register({
    family: "Roboto Mono",
    src: "https://fonts.gstatic.com/s/robotomono/v22/L0x5DF4xlVMF-BfR8bXMIjhFq3-cXbKDO1w.ttf",
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Roboto Mono",
        fontSize: 9,
        backgroundColor: "#1e1e1e",
        color: "#d4d4d4",
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        paddingBottom: 10,
    },
    name: {
        fontSize: 18,
        color: "#569cd6", // VS Code blue
        marginBottom: 5,
    },
    comment: {
        color: "#6a9955",
        fontStyle: "italic",
        marginBottom: 2,
    },
    keyword: {
        color: "#c586c0",
    },
    string: {
        color: "#ce9178",
    },
    function: {
        color: "#dcdcaa",
    },
    variable: {
        color: "#9cdcfe",
    },
    indent: {
        marginLeft: 15,
    },
    indent2: {
        marginLeft: 30,
    },
    section: {
        marginBottom: 15,
    }
});

export const TechTemplatePDF = ({ cv }: { cv: CV }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.header}>
                <Text style={styles.comment}>// Full Stack Developer based in {cv.data.personalInfo.location}</Text>
                <Text style={{ flexDirection: 'row' }}>
                    <Text style={styles.keyword}>const </Text>
                    <Text style={styles.variable}>candidate </Text>
                    <Text>= </Text>
                    <Text style={styles.keyword}>new </Text>
                    <Text style={styles.function}>Developer</Text>
                    <Text>(</Text>
                    <Text style={styles.string}>&quot;{cv.data.personalInfo.fullName}&quot;</Text>
                    <Text>);</Text>
                </Text>
                <Text style={styles.indent}>
                    candidate.<Text style={styles.function}>setContact</Text>
                    ({"{"} email: <Text style={styles.string}>&quot;{cv.data.personalInfo.email}&quot;</Text>, phone: <Text style={styles.string}>&quot;{cv.data.personalInfo.phone}&quot;</Text> {"}"});
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.comment}>/** Experience */</Text>
                <Text>candidate.<Text style={styles.variable}>experience</Text> = [</Text>
                {cv.data.experience.map(exp => (
                    <View key={exp.id} style={styles.indent}>
                        <Text>{"{"}</Text>
                        <View style={styles.indent2}>
                            <Text>company: <Text style={styles.string}>&quot;{exp.company}&quot;</Text>,</Text>
                            <Text>role: <Text style={styles.string}>&quot;{exp.position}&quot;</Text>,</Text>
                            <Text>period: <Text style={styles.string}>&quot;{exp.startDate} - {exp.current ? "Present" : exp.endDate}&quot;</Text>,</Text>
                            <Text>description: <Text style={styles.string}>`{exp.description}`</Text></Text>
                        </View>
                        <Text>{"},"}</Text>
                    </View>
                ))}
                <Text>];</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.comment}>/** Education */</Text>
                <Text>candidate.<Text style={styles.variable}>education</Text> = [</Text>
                {cv.data.education.map(edu => (
                    <View key={edu.id} style={styles.indent}>
                        <Text>{"{"}</Text>
                        <View style={styles.indent2}>
                            <Text>institution: <Text style={styles.string}>&quot;{edu.institution}&quot;</Text>,</Text>
                            <Text>degree: <Text style={styles.string}>&quot;{edu.degree} in {edu.field}&quot;</Text>,</Text>
                            <Text>year: <Text style={styles.string}>&quot;{edu.startDate} - {edu.endDate}&quot;</Text></Text>
                        </View>
                        <Text>{"},"}</Text>
                    </View>
                ))}
                <Text>];</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.comment}>/** Skills array */</Text>
                <Text>candidate.<Text style={styles.variable}>skills</Text> = [</Text>
                <View style={styles.indent}>
                    <Text style={styles.string}>
                        {cv.data.skills.technical.map(s => `"${s}"`).join(", ")}
                    </Text>
                </View>
                <Text>];</Text>
            </View>

            <Text style={{ marginTop: 20 }}>
                <Text style={styles.keyword}>export default </Text>
                <Text style={styles.variable}>candidate</Text>;
            </Text>

        </Page>
    </Document>
);
