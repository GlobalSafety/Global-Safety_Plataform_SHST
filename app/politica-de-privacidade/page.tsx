export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>

      <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introdução</h2>
          <p>
            A Global Safety Angola (&quot;Empresa&quot;) está comprometida em proteger a privacidade dos seus utilizadores. Esta Política de Privacidade explica como recolhemos, utilizamos, divulgamos e protegemos os seus dados pessoais.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dados que Recolhemos</h2>
          <p>Recolhemos os seguintes tipos de dados:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dados de Identificação:</strong> Nome, email, telefone, empresa.</li>
            <li><strong>Dados de Autenticação:</strong> Palavra-passe (encriptada), tokens de sessão.</li>
            <li><strong>Dados de Utilização:</strong> Atividades na plataforma, documentos carregados, conformidade.</li>
            <li><strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador, hora de acesso.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalidade da Recolha</h2>
          <p>Os seus dados são utilizados para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer e melhorar os serviços da plataforma SHST.</li>
            <li>Autenticar e gerir a sua conta.</li>
            <li>Cumprir requisitos legais e regulamentares (IGT, ACT).</li>
            <li>Enviar notificações e alertas relacionados com conformidade.</li>
            <li>Analisar a utilização da plataforma para melhorias.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Retenção de Dados</h2>
          <p>
            Os dados pessoais são retidos durante o período de utilização ativa da conta. Após a eliminação da conta:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dados de conformidade são arquivados por 7 anos (conforme legislação angolana).</li>
            <li>Dados pessoais são eliminados após 30 dias, exceto se exigido por lei.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Segurança dos Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger os seus dados:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encriptação de dados em trânsito (HTTPS/TLS).</li>
            <li>Encriptação de senhas (bcrypt).</li>
            <li>Controlo de acesso baseado em papéis (RBAC).</li>
            <li>Auditorias de segurança regulares.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Partilha de Dados</h2>
          <p>
            Os seus dados não são partilhados com terceiros, exceto:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Com autoridades competentes (ACT, IGT) quando exigido por lei.</li>
            <li>Com prestadores de serviços (hosting, análise) sob contratos de confidencialidade.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Direitos do Utilizador</h2>
          <p>Tem direito a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Aceder aos seus dados pessoais.</li>
            <li>Corrigir dados incorretos.</li>
            <li>Solicitar a eliminação dos seus dados.</li>
            <li>Revogar o consentimento a qualquer momento.</li>
          </ul>
          <p className="mt-4">
            Para exercer estes direitos, contacte-nos em <strong>privacy@globalsafety.ao</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contacto</h2>
          <p>
            Para questões sobre privacidade, contacte:
          </p>
          <p className="mt-2">
            <strong>Global Safety Angola</strong><br />
            Email: privacy@globalsafety.ao<br />
            Telefone: +244 923 456 789<br />
            Endereço: Luanda, Angola
          </p>
        </section>

        <section>
          <p className="text-sm text-gray-600 mt-8">
            Última atualização: {new Date().toLocaleDateString("pt-AO")}
          </p>
        </section>
      </div>
    </div>
  );
}