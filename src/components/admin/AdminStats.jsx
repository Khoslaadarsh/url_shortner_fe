import { motion } from "framer-motion";
import { Card, Statistic, Row, Col } from "antd";
import { fadeUp } from "../../lib/animations";

export function AdminStats({ stats }) {
  return (
    <Row gutter={16} className="mb-8">
      {stats.map((stat, i) => (
        <Col xs={12} md={6} key={stat.title}>
          <motion.div {...fadeUp(i * 0.07)}>
            <Card className="!bg-gray-900 !border-gray-800 rounded-xl mb-4 md:mb-0 hover:!border-gray-700 transition-colors">
              <div className={`text-2xl mb-1 ${stat.color}`}>{stat.icon}</div>
              <Statistic
                title={<span className="text-gray-500 text-xs">{stat.title}</span>}
                value={stat.value}
                valueStyle={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}
              />
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
}
