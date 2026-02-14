import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { CV } from "@/types/cv";

Font.register({
    family: "OpenSans",
    src: "https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVQUwaEQbjA.ttf",
});

const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontFamily: "OpenSans",
        fontSize: 10,
        color: "#333",
    },
    header: {
        marginBottom: 30,
    },
    name: {
        fontSize: 28,
        fontWeight: "light",
        letterSpacing: 2,
        marginBottom: 5,
        textTransform: "uppercase",
    },
    jobTitle: {
        fontSize: 10,
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 15,
        color: "#666",
    },
    contact: {
        flexDirection: "row",
        gap: 20,
        fontSize: 9,
        color: "#888",
    },
    section: {
        marginBottom: 25,
    },
    title: {
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#DDD",
        paddingBottom: 5,
    },
    item: {
        marginBottom: 15,
        flexDirection: "row",
    },
    leftCol: {
        width: "25%",
        paddingRight: 10,
    },
    rightCol: {
        width: "75%",
    },
    date: {
        fontSize: 9,
        color: "#888",
    },
    bold: {
        fontWeight: "bold",
        marginBottom: 2,
        fontSize: 10,
    },
    description: {
        lineHeight: 1.6,
        color: "#555",
    },
    skills: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    }
});

export const MinimalistTemplatePDF = ({ cv }: { cv: CV }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.name}>{cv.data.personalInfo.fullName}</Text>
                <Text style={styles.jobTitle}>{cv.data.personalInfo.jobTitle}</Text>
                <View style={styles.contact}>
                    <Text>{cv.data.personalInfo.email}</Text>
                    <Text>{cv.data.personalInfo.phone}</Text>
                    <Text>{cv.data.personalInfo.location}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Experience</Text>
                {cv.data.experience.map(exp => (
                    <View key={exp.id} style={styles.item}>
                        <View style={styles.leftCol}>
                            <Text style={styles.date}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                        </View>
                        <View style={styles.rightCol}>
                            <Text style={styles.bold}>{exp.position}</Text>
                            <Text style={{ marginBottom: 4, color: "#666" }}>{exp.company}</Text>
                            <Text style={styles.description}>{exp.description}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Education</Text>
                {cv.data.education.map(edu => (
                    <View key={edu.id} style={styles.item}>
                        <View style={styles.leftCol}>
                            <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <View style={styles.rightCol}>
                            <Text style={styles.bold}>{edu.institution}</Text>
                            <Text>{edu.degree} in {edu.field}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Skills</Text>
                <View style={styles.skills}>
                    {cv.data.skills.technical.map(skill => (
                        <Text key={skill}>{skill}</Text>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);
